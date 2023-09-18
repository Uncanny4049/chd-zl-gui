const SToStr = (t) => {
    if (Math.floor(t / 3600) > 0) {
        //小时
        let h = Math.floor(t / 3600)
        let m = Math.floor(t % 3600 / 60)
        let s = t % 3600 % 60
        return `${h}小时 ${m}分钟 ${s.toFixed(0)}秒`
    } else if (Math.floor(t / 60) > 0) {
        // 分钟
        let m = Math.floor(t / 60)
        let s = t % 60
        return `${m}分钟 ${s.toFixed(0)}秒`
    } else {
        return `${t}秒`
    }
}

const DateFunc = (str) => {
    const startTime = new Date(str);
    if (!isNaN(startTime.getTime())) {
        const year = startTime.getFullYear();
        const month = String(startTime.getMonth() + 1).padStart(2, '0');
        const day = String(startTime.getDate()).padStart(2, '0');
        const hours = String(startTime.getHours()).padStart(2, '0');
        const minutes = String(startTime.getMinutes()).padStart(2, '0');
        const seconds = String(startTime.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    return str
}

export {DateFunc, SToStr}