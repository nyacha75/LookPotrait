const canvas = document.getElementById('faceCanvas');
const ctx = canvas.getContext('2d');

// 이미지 로드 함수 (비동기 처리를 위해 Promise 사용)
function loadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = src;
    });
}

// 캔버스에 얼굴 그리기
async function drawFace() {
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 선택된 값 가져오기
    const browSrc = document.getElementById('browSelect').value;
    const eyeSrc = document.getElementById('eyeSelect').value;
    const mouthSrc = document.getElementById('mouthSelect').value;
    const nameText = document.getElementById('faceName').value;

    // 기본 베이스 얼굴 이미지 (미리 images 폴더에 준비)
    const baseImg = await loadImage('images/base.png');
    const browImg = await loadImage(browSrc);
    const eyeImg = await loadImage(eyeSrc);
    const mouthImg = await loadImage(mouthSrc);

    // 순서대로 캔버스에 그리기 (아래에 깔릴 것부터 먼저)
    ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(browImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(eyeImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(mouthImg, 0, 0, canvas.width, canvas.height);

    // 표정 이름 텍스트 그리기 (하단 중앙)
    if (nameText) {
        ctx.font = '24px "Malgun Gothic"';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'center';
        ctx.fillText(nameText, canvas.width / 2, canvas.height - 20);
    }
}

// 이미지 다운로드 기능
function downloadImage() {
    const link = document.createElement('a');
    const nameText = document.getElementById('faceName').value || 'expression';
    link.download = `${nameText}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// 처음 로드될 때 기본 얼굴 한번 그리기
window.onload = drawFace;
