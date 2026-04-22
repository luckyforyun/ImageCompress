const translations = {
    en: {
        title: "Lumina Compress",
        subtitle: "Professional Image Compression & Conversion",
        language: "Language",
        dropzoneText: "Drag & drop your image here, or click to browse",
        formatLabel: "Output Format",
        qualityLabel: "Compression Quality",
        processBtn: "Process Image",
        downloadBtn: "Download Image",
        originalSize: "Original Size",
        compressedSize: "New Size",
        errorNoFile: "Please select an image first.",
        errorProcess: "Error processing the image.",
        success: "Processing complete!",
        statusIdle: "Waiting for image...",
        statusProcessing: "Processing...",
        statusDone: "Done!"
    },
    zh: {
        title: "Lumina 极光压缩",
        subtitle: "专业的图片压缩与格式转换工具",
        language: "语言",
        dropzoneText: "将图片拖拽至此，或点击浏览",
        formatLabel: "输出格式",
        qualityLabel: "压缩质量",
        processBtn: "处理图片",
        downloadBtn: "下载图片",
        originalSize: "原始大小",
        compressedSize: "新大小",
        errorNoFile: "请先选择一张图片。",
        errorProcess: "处理图片时发生错误。",
        success: "处理完成！",
        statusIdle: "等待上传图片...",
        statusProcessing: "正在处理...",
        statusDone: "完成！"
    },
    ja: {
        title: "Lumina 圧縮",
        subtitle: "プロフェッショナルな画像圧縮・変換ツール",
        language: "言語",
        dropzoneText: "ここに画像をドロップするか、クリックして参照",
        formatLabel: "出力フォーマット",
        qualityLabel: "圧縮品質",
        processBtn: "画像を処理する",
        downloadBtn: "画像をダウンロード",
        originalSize: "元のサイズ",
        compressedSize: "新しいサイズ",
        errorNoFile: "先に画像を選択してください。",
        errorProcess: "画像の処理中にエラーが発生しました。",
        success: "処理完了！",
        statusIdle: "画像の待機中...",
        statusProcessing: "処理中...",
        statusDone: "完了！"
    },
    ko: {
        title: "Lumina 압축",
        subtitle: "전문적인 이미지 압축 및 변환 도구",
        language: "언어",
        dropzoneText: "여기로 이미지를 드래그 앤 드롭하거나 클릭하여 찾아보기",
        formatLabel: "출력 형식",
        qualityLabel: "압축 품질",
        processBtn: "이미지 처리",
        downloadBtn: "이미지 다운로드",
        originalSize: "원본 크기",
        compressedSize: "새 크기",
        errorNoFile: "먼저 이미지를 선택해주세요.",
        errorProcess: "이미지 처리 중 오류가 발생했습니다.",
        success: "처리 완료!",
        statusIdle: "이미지 대기 중...",
        statusProcessing: "처리 중...",
        statusDone: "완료!"
    },
    es: {
        title: "Compresión Lumina",
        subtitle: "Compresión y Conversión Profesional de Imágenes",
        language: "Idioma",
        dropzoneText: "Arrastra y suelta tu imagen aquí, o haz clic para explorar",
        formatLabel: "Formato de Salida",
        qualityLabel: "Calidad de Compresión",
        processBtn: "Procesar Imagen",
        downloadBtn: "Descargar Imagen",
        originalSize: "Tamaño Original",
        compressedSize: "Nuevo Tamaño",
        errorNoFile: "Por favor, seleccione una imagen primero.",
        errorProcess: "Error al procesar la imagen.",
        success: "¡Procesamiento completo!",
        statusIdle: "Esperando imagen...",
        statusProcessing: "Procesando...",
        statusDone: "¡Hecho!"
    }
};

let currentLang = localStorage.getItem('appLang') || 'en';

function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('appLang', lang);
        applyTranslations();
        document.getElementById('lang-select').value = lang;
    }
}

function applyTranslations() {
    const texts = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            el.textContent = texts[key];
        }
    });
}

// Wait for DOM to finish loading before applying translations
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }
});

function getTranslation(key) {
    return translations[currentLang][key] || key;
}
