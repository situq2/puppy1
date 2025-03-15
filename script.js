const puppy = document.getElementById('puppy');
const face1 = document.getElementById('face1');
const face2 = document.getElementById('face2');

let lastClickTime = 0;
let clickCount = 0;
let isFace1Active = true;
let isLocked = false; // 是否锁定表情
let touchStartTime = 0; // 抚摸开始时间
let touchTimer = null; // 抚摸计时器

// 切换图片的函数
function switchImage(newSrc) {
    if (isFace1Active) {
        face2.src = newSrc;
        face1.classList.remove('active');
        face2.classList.add('active');
    } else {
        face1.src = newSrc;
        face2.classList.remove('active');
        face1.classList.add('active');
    }
    isFace1Active = !isFace1Active;
}

// 单击事件
puppy.addEventListener('click', () => {
    const currentTime = new Date().getTime();
    console.log("点击时间:", currentTime); // 打印点击时间
    console.log("上次点击时间:", lastClickTime); // 打印上次点击时间
    console.log("点击次数:", clickCount); // 打印点击次数

    if (currentTime - lastClickTime < 300) { // 快速点击
        clickCount++;
        console.log("快速点击次数:", clickCount); // 打印快速点击次数

        if (isLocked) {
            console.log("当前表情已锁定"); // 打印锁定状态
            if (face1.src.includes("2.png") && clickCount === 2) {
                console.log("从 2.png 切换到 5.png"); // 打印切换逻辑
                switchImage("images/5.png");
                clickCount = 0;
            } else if (face1.src.includes("5.png") && clickCount === 2) {
                console.log("从 5.png 切换到 3.png"); // 打印切换逻辑
                switchImage("images/3.png");
                clickCount = 0;
            }
        } else {
            console.log("当前表情未锁定"); // 打印锁定状态
            if (clickCount === 3) {
                console.log("快速点击三下，切换到 2.png"); // 打印切换逻辑
                switchImage("images/2.png");
                isLocked = true;
            } else if (clickCount === 5) {
                console.log("快速点击五下，切换到 5.png"); // 打印切换逻辑
                switchImage("images/5.png");
                isLocked = true;
            } else if (clickCount === 7) {
                console.log("快速点击七下，切换到 3.png"); // 打印切换逻辑
                switchImage("images/3.png");
                isLocked = true;
                clickCount = 0;
            }
        }
    } else {
        if (!isLocked) {
            console.log("单击，切换到 4.png"); // 打印切换逻辑
            switchImage("images/4.png");
        }
        clickCount = 0;
    }
    lastClickTime = currentTime;
});
// 抚摸开始事件
puppy.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchStartTime = new Date().getTime(); // 记录抚摸开始时间
    touchTimer = setInterval(() => {
        const currentTime = new Date().getTime();
        const duration = currentTime - touchStartTime; // 抚摸持续时间

        if (duration >= 3000) { // 抚摸 3 秒
            switchImage("images/6.png"); // 变成 6.png
            isLocked = false; // 解锁表情
            clearInterval(touchTimer); // 清除计时器
        } else if (duration >= 2000) { // 抚摸 2 秒
            switchImage("images/1.png"); // 变成 1.png
        }
    }, 100); // 每 100 毫秒检查一次
});

// 抚摸结束事件
puppy.addEventListener('touchend', () => {
    clearInterval(touchTimer); // 清除计时器
});

// 预加载图片
const images = [
    "images/1.png",
    "images/2.png",
    "images/3.png",
    "images/4.png",
    "images/5.png",
    "images/6.png"
];

images.forEach((src) => {
    const img = new Image();
    img.src = src;
});

// 图片加载失败时显示占位图
face1.onerror = () => {
    face1.src = "images/placeholder.png";
};
face2.onerror = () => {
    face2.src = "images/placeholder.png";
};
