<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import jsQR from "jsqr";

    export let onQrScanned: (event: {data: string}) => void;
    
    export let className = "";
    $: classData = className + " object-none";
  
    // export let 

    let video: HTMLVideoElement;
    let canvas: HTMLCanvasElement;
    let canvasCtx: CanvasRenderingContext2D | null;
    let stream: MediaStream | null;
    let qrData = "";
    let errorMsg = "";
  
    // Function to scan the QR code
    const scanQRCode = () => {
      if (!canvasCtx || !video) return;
  
      canvasCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvasCtx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);
  
      if (code) {
        onQrScanned({data: code.data});
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
      } catch (err: any) {
        errorMsg = "Could not access the camera: " + err.message;
      }
    };
  
    onMount(() => {
      canvasCtx = canvas.getContext("2d");
      startVideoStream();
    });
  
    onDestroy(() => {
      if (stream) {
        stream.getTracks().forEach((track: { stop: () => any; }) => track.stop());
      }
    });
</script>

<div>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video class={classData} bind:this={video}></video>
    <canvas bind:this={canvas} width="640" height="480" style="display: none;"></canvas>
</div>