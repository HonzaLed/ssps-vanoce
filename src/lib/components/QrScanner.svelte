<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { createEventDispatcher } from "svelte";
    import jsQR from "jsqr";

    const dispatch = createEventDispatcher();
    
    export let className = "";
    $: classData = className + " object-none";
  
    // export let 

    let video;
    let canvas;
    let canvasCtx;
    let stream;
    let qrData = "";
    let errorMsg = "";
  
    // Function to scan the QR code
    const scanQRCode = () => {
      if (!canvasCtx || !video) return;
  
      canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
  
      if (code) {
        dispatch("qrScanned", {data: code.data});
      }
  
      // Continue scanning
      requestAnimationFrame(scanQRCode);
    };
  
    // Set up the video stream
    const startVideoStream = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;
        video.setAttribute("playsinline", "true");
        video.play();
        requestAnimationFrame(scanQRCode);
      } catch (err) {
        errorMsg = "Could not access the camera: " + err.message;
      }
    };
  
    onMount(() => {
      canvasCtx = canvas.getContext("2d");
      startVideoStream();
    });
  
    onDestroy(() => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    });
</script>

<div>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video class={classData} bind:this={video}></video>
    <canvas bind:this={canvas} width="640" height="480" style="display: none;"></canvas>
</div>