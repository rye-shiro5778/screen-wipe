// function segmentBody(input, output) {
//     async function renderFrame() {
//         const net = await bodyPix.load();
//         const segmentation = await net.segmentPerson(input);
//         const backgroundBlurAmount = 3;
//         const edgeBlurAmount = 3;
//         const flipHorizontal = true;
//         bodyPix.drawBokehEffect(
//             output, input, segmentation, backgroundBlurAmount,
//             edgeBlurAmount, flipHorizontal);
//             requestAnimationFrame(renderFrame);
//         }
//     renderFrame();
// };

// async function cameraSwitch() {
//         if (video.srcObject) {
//             video.srcObject = null;
//         } else {
//             await setupCamera(video);
//             // await segmentBody(video, canvas);
//         }
//     };

// // スタイル初期値
// let opacity = 1;
// let right = 70;
// let bottom = 70;
// let width = 300;
// let height = 300;
// let clipPath = 50;

// document.addEventListener('DOMContentLoaded', event => {
//     video.style.right = right + "px";
//     video.style.bottom = bottom + "px";
//     video.style.width = width + "px";
//     video.style.height = height + "px";
//     video.style.opacity = opacity;
//     video.style.clipPath = circle(${clipPath}% at 50% 50%)
// });

// // ショートカット定義
// document.addEventListener('keydown', event => {
//     if (event.ctrlKey && event.code === 'Slash') {
//         cameraSwitch();
//     };
//     // opacityの変更　コマンド
//     if (event.ctrlKey && event.code === 'Period' && opacity > 0) {
//         opacity -= 0.2;
//         video.style.opacity = opacity;
//     };
//     if (event.ctrlKey && event.code === 'Comma' && opacity < 1.0) {
//         opacity += 0.2;
//         video.style.opacity = opacity;
//     };
//     // x位置の変更　コマンド
//     if (event.ctrlKey && event.keyCode === 39 && right > -400) {
//         right -= 10;
//         video.style.right = right + "px";
//     };
//     if (event.ctrlKey && event.keyCode === 37 && right < 2000) {
//         right += 10;
//         video.style.right = right + "px";
//     };
//     // y位置の変更　コマンド
//     if (event.ctrlKey && event.keyCode === 40 && bottom > -500) {
//         bottom -= 10;
//         video.style.bottom = bottom + "px";
//     };
//     if (event.ctrlKey && event.keyCode === 38 && bottom < 1200) {
//         bottom += 10;
//         video.style.bottom = bottom + "px";
//     };
//     // サイズの変更　コマンド
//     if (event.ctrlKey && event.code === 'KeyS' && width > 100) {
//         width -= 10;
//         height -= 10;
//         video.style.width = width + "px";
//         video.style.height = height + "px";
//     };
//     if (event.ctrlKey && event.code === 'KeyA' && width < 1200) {
//         width += 10;
//         height += 10;
//         video.style.width = width + "px";
//         video.style.height = height + "px";
//     };
//     // 円サイズの変更　コマンド
//     if (event.ctrlKey && event.code === 'KeyF' && clipPath > 0) {
//         clipPath -= 5;
//         video.style.clipPath = circle(${clipPath}% at 50% 50%)
//     };
//     if (event.ctrlKey && event.code === 'KeyD' && clipPath < 50) {
//         clipPath += 5;
//         video.style.clipPath = circle(${clipPath}% at 50% 50%)
//     };
// });
