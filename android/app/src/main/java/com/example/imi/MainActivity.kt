package com.example.imi

import android.Manifest
import android.annotation.SuppressLint
import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.media.AudioManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.view.View
import android.webkit.ConsoleMessage
import android.webkit.CookieManager
import android.webkit.DownloadListener
import android.webkit.PermissionRequest
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.ProgressBar
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.webkit.WebViewAssetLoader
import com.example.imi.bridge.WebAppInterface

class MainActivity : AppCompatActivity() {

    companion object {
        private const val TAG = "ImiMainActivity"
        // Primary live URL for the full IMI social platform
        const val PRIMARY_APP_URL = "https://ais-dev-e52mstu736n3fzhf67gwqu-385033582149.europe-west1.run.app"
        const val PREVIEW_APP_URL = "https://ais-pre-e52mstu736n3fzhf67gwqu-385033582149.europe-west1.run.app"
        const val OFFLINE_FALLBACK_URL = "https://appassets.androidplatform.net/assets/www/index.html"

        val ALLOWED_HOSTS = listOf(
            "ais-dev-e52mstu736n3fzhf67gwqu-385033582149.europe-west1.run.app",
            "ais-pre-e52mstu736n3fzhf67gwqu-385033582149.europe-west1.run.app",
            "appassets.androidplatform.net",
            "imi-studio.ai.studio",
            "localhost"
        )
    }

    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar
    private lateinit var layoutError: View
    private lateinit var btnRetry: Button
    private lateinit var assetLoader: WebViewAssetLoader

    private var fileUploadCallback: ValueCallback<Array<Uri>>? = null
    private var pendingPermissionRequest: PermissionRequest? = null

    // File Chooser Activity Result Launcher
    private val fileChooserLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (fileUploadCallback == null) return@registerForActivityResult

        val uris: Array<Uri>? = if (result.resultCode == RESULT_OK && result.data != null) {
            val clipData = result.data?.clipData
            if (clipData != null) {
                Array(clipData.itemCount) { i -> clipData.getItemAt(i).uri }
            } else {
                val dataUri = result.data?.data
                if (dataUri != null) arrayOf(dataUri) else null
            }
        } else {
            null
        }

        fileUploadCallback?.onReceiveValue(uris)
        fileUploadCallback = null
    }

    // Permission Request Launcher for WebRTC & System Features
    private val appPermissionsLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val cameraGranted = permissions[Manifest.permission.CAMERA] == true
        val audioGranted = permissions[Manifest.permission.RECORD_AUDIO] == true

        if (cameraGranted && audioGranted) {
            pendingPermissionRequest?.let { req ->
                req.grant(req.resources)
                pendingPermissionRequest = null
            }
        } else {
            pendingPermissionRequest?.deny()
            pendingPermissionRequest = null
            Toast.makeText(this, "يلزم منح صلاحيات الكاميرا والميكروفون للمكالمات", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        progressBar = findViewById(R.id.progressBar)
        layoutError = findViewById(R.id.layoutError)
        btnRetry = findViewById(R.id.btnRetry)

        // Initialize AssetLoader for bundled offline assets
        assetLoader = WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()

        btnRetry.setOnClickListener {
            layoutError.visibility = View.GONE
            webView.visibility = View.VISIBLE
            webView.loadUrl(PRIMARY_APP_URL)
        }

        setupWebView()
        requestInitialPermissions()

        // Handle Back button to navigate within WebView history
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    moveTaskToBack(true)
                }
            }
        })

        // Check for deep link or notification payload
        val initialUrl = intent.getStringExtra("targetUrl") ?: PRIMARY_APP_URL
        webView.loadUrl(initialUrl)
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        val settings = webView.settings

        // Enable JavaScript and modern web capabilities
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true

        // Multimedia & WebRTC Configuration
        settings.mediaPlaybackRequiresUserGesture = false
        settings.allowFileAccess = true
        settings.allowContentAccess = true

        // Viewport and Scaling
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.setSupportZoom(false)
        settings.builtInZoomControls = false

        // Cache mode for fast local response
        settings.cacheMode = WebSettings.LOAD_DEFAULT

        // Append custom user agent identifier for the React app to detect native environment
        val defaultUserAgent = settings.userAgentString
        settings.userAgentString = "$defaultUserAgent ImiAndroidNative/1.0.0"

        // Cookie management
        CookieManager.getInstance().setAcceptCookie(true)
        CookieManager.getInstance().setAcceptThirdPartyCookies(webView, true)

        // Inject Native JavaScript Bridge
        val webAppInterface = WebAppInterface(this)
        webView.addJavascriptInterface(webAppInterface, "AndroidBridge")
        webView.addJavascriptInterface(webAppInterface, "Android")

        // Download Listener
        webView.setDownloadListener(DownloadListener { url, userAgent, contentDisposition, mimetype, _ ->
            try {
                val request = DownloadManager.Request(Uri.parse(url)).apply {
                    setMimeType(mimetype)
                    addRequestHeader("User-Agent", userAgent)
                    setDescription("تحميل ملف من تطبيق IMI")
                    setTitle(Uri.parse(url).lastPathSegment ?: "imi_download")
                    setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                    setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, Uri.parse(url).lastPathSegment ?: "download")
                }
                val dm = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
                dm.enqueue(request)
                Toast.makeText(this, "بدأ التحميل في الخلفية...", Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                startActivity(intent)
            }
        })

        // WebChromeClient: WebRTC Permissions, File Picker, Progress
        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                if (newProgress < 100) {
                    progressBar.visibility = View.VISIBLE
                    progressBar.progress = newProgress
                } else {
                    progressBar.visibility = View.GONE
                }
            }

            override fun onPermissionRequest(request: PermissionRequest) {
                val origin = request.origin?.host ?: ""
                val isAllowed = ALLOWED_HOSTS.any { allowed -> origin.contains(allowed) || allowed.contains(origin) }

                if (isAllowed) {
                    val needsCamera = request.resources.contains(PermissionRequest.RESOURCE_VIDEO_CAPTURE)
                    val needsAudio = request.resources.contains(PermissionRequest.RESOURCE_AUDIO_CAPTURE)

                    val hasCamera = ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED
                    val hasAudio = ContextCompat.checkSelfPermission(this@MainActivity, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED

                    if ((!needsCamera || hasCamera) && (!needsAudio || hasAudio)) {
                        request.grant(request.resources)
                    } else {
                        pendingPermissionRequest = request
                        val permissionsToRequest = mutableListOf<String>()
                        if (needsCamera && !hasCamera) permissionsToRequest.add(Manifest.permission.CAMERA)
                        if (needsAudio && !hasAudio) permissionsToRequest.add(Manifest.permission.RECORD_AUDIO)
                        appPermissionsLauncher.launch(permissionsToRequest.toTypedArray())
                    }
                } else {
                    request.deny()
                }
            }

            override fun onShowFileChooser(
                view: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                fileUploadCallback?.onReceiveValue(null)
                fileUploadCallback = filePathCallback

                val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                    type = "*/*"
                    addCategory(Intent.CATEGORY_OPENABLE)
                    putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
                }

                try {
                    fileChooserLauncher.launch(intent)
                } catch (e: Exception) {
                    fileUploadCallback = null
                    return false
                }
                return true
            }

            override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                Log.d(TAG, "[WebView Console] ${consoleMessage?.message()} (line: ${consoleMessage?.lineNumber()})")
                return true
            }
        }

        // WebViewClient: Navigation security, offline asset interception & Error Handling
        webView.webViewClient = object : WebViewClient() {
            override fun shouldInterceptRequest(view: WebView?, request: WebResourceRequest?): WebResourceResponse? {
                val uri = request?.url ?: return null
                if (uri.host == "appassets.androidplatform.net") {
                    return assetLoader.shouldInterceptRequest(uri)
                }
                return super.shouldInterceptRequest(view, request)
            }

            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val uri = request?.url ?: return false
                val host = uri.host ?: ""

                // Security: Keep navigation inside WebView only for approved domains
                val isInternal = ALLOWED_HOSTS.any { allowed -> host.contains(allowed) || allowed.contains(host) }

                if (isInternal) {
                    return false // Let WebView load it
                }

                // External links or special schemes (tel, mailto, etc.) open in external system browser/app
                try {
                    val intent = Intent(Intent.ACTION_VIEW, uri)
                    startActivity(intent)
                } catch (e: Exception) {
                    Log.w(TAG, "Cannot launch external URI: $uri", e)
                }
                return true
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                progressBar.visibility = View.GONE
                layoutError.visibility = View.GONE
                webView.visibility = View.VISIBLE
            }

            override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
                super.onReceivedError(view, request, error)
                if (request?.isForMainFrame == true) {
                    val failingUrl = request.url?.toString() ?: ""
                    Log.w(TAG, "Main frame failed to load: $failingUrl - ${error?.description}")
                    if (!failingUrl.contains("appassets.androidplatform.net")) {
                        Log.i(TAG, "Switching to bundled offline asset container")
                        view?.loadUrl(OFFLINE_FALLBACK_URL)
                    } else {
                        layoutError.visibility = View.VISIBLE
                        webView.visibility = View.GONE
                    }
                }
            }
        }
    }

    private fun requestInitialPermissions() {
        val permissions = mutableListOf(
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO,
            Manifest.permission.READ_CONTACTS
        )

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions.add(Manifest.permission.POST_NOTIFICATIONS)
        }

        val ungranted = permissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }

        if (ungranted.isNotEmpty()) {
            appPermissionsLauncher.launch(ungranted.toTypedArray())
        }
    }

    // Bridge helpers invoked by WebAppInterface
    fun checkAndRequestContactsPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(Manifest.permission.READ_CONTACTS), 101)
        }
    }

    fun startCallAudioRouting(callType: String, isSpeaker: Boolean) {
        val audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager
        audioManager.mode = AudioManager.MODE_IN_COMMUNICATION
        audioManager.isSpeakerphoneOn = isSpeaker
    }

    fun setSpeakerphoneOn(isSpeaker: Boolean) {
        val audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager
        audioManager.isSpeakerphoneOn = isSpeaker
    }

    fun stopCallAudioRouting() {
        val audioManager = getSystemService(Context.AUDIO_SERVICE) as AudioManager
        audioManager.mode = AudioManager.MODE_NORMAL
        audioManager.isSpeakerphoneOn = false
    }

    override fun onResume() {
        super.onResume()
        webView.onResume()
    }

    override fun onPause() {
        super.onPause()
        webView.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
        webView.destroy()
    }
}
