function detectLanguage(text: string): string {
    // Define sets of Ukrainian and Russian Cyrillic characters
    const ukrainianChars = new Set('абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'.split(''));
    const russianChars = new Set('абвгдеёжзийклмнопрстуфхцчшщъыьэюя'.split(''));

    let isUkrainian = false;
    let isRussian = false;

    // Check if text contains Ukrainian characters
    for (let char of text) {
        if (ukrainianChars.has(char)) {
            isUkrainian = true;
            break;
        }
    }

    // Check if text contains Russian characters
    for (let char of text) {
        if (russianChars.has(char)) {
            isRussian = true;
            break;
        }
    }

    if (isUkrainian && !isRussian) {
        return 'ukrainian';
    } else if (!isUkrainian && isRussian) {
        return 'russian';
    } else {
        // Default to Ukrainian if both are present or if neither are present
        return 'ukrainian';
    }
}

export function transliterateCyrillicToLatin(text: string): string {
    // Check if the input text contains Latin characters
    const containsLatin = /[a-zA-Z]/.test(text);

    // If the input text contains Latin characters, return it as is
    if (containsLatin) {
        return text;
    }

    // Replace problematic characters with hyphens
    const sanitizedText = text.replace(/['"\\]/g, '-');

    const ukrainianToLatinMap: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ie', 'ж': 'zh',
        'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'i', 'й': 'i', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '', 'ю': 'iu', 'я': 'ia',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh',
        'З': 'Z', 'И': 'Y', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
        'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts',
        'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ь': '', 'Ю': 'Yu', 'Я': 'Ya'
    };

    const russianToLatinMap: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z',
        'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
        'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z',
        'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
        'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch',
        'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };

    // Detect language of the text
    const language = detectLanguage(text);

    // Select appropriate mapping based on detected language
    const map = language === 'ukrainian' ? ukrainianToLatinMap : russianToLatinMap;

    return text.split('').map(char => map[char] || char).join('');
}

export function sanitizeString(input: string): string {
    // Define problematic characters
    const problematicChars = /['"”“\\]/g;

    // Replace problematic characters with hyphens
    let sanitizedString = input.replace(problematicChars, '-');

    // Replace all spaces with hyphens
    sanitizedString = sanitizedString.replace(/\s/g, '-');

    // Remove repeating hyphens
    sanitizedString = sanitizedString.replace(/-+/g, '-');

    // Remove hyphen at the end of the string
    sanitizedString = sanitizedString.replace(/-$/, '');

    return sanitizedString;
}


export function getAudioDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);

        audio.onloadedmetadata = function() {
        resolve(audio.duration);
        URL.revokeObjectURL(url);
        };

        audio.onerror = function() {
        reject('Error loading audio file');
        URL.revokeObjectURL(url);
        };
    });
}

export function formatAudioDuration(duration: number, format: boolean = false, showSeconds: boolean = true): string {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    if (format) {
        return `${minutes} min. ${showSeconds && seconds ? seconds + 'sec.' : ''}`;
    }

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export function formatSeekDuration (seek: number, duration: number) {
    const seekInSeconds = Math.floor(seek * duration);
    const minutes = Math.floor(seekInSeconds / 60);
    const seconds = seekInSeconds % 60;

    return `${minutes}:${seconds === 0 ? '00' : seconds.toString().padStart(2, '0')}`;
};

export function shuffleArray(array: any[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] =
        [array[randomIndex], array[currentIndex]];
    }

    return array;
}

export const formatListeners = (listeners: number) => {
    switch (true) {
        case listeners < 10000:
        return listeners;
        case listeners < 1000000:
        return `${(listeners / 1000)}K`;
        case listeners < 1000000000:
        return `${(listeners / 1000000).toFixed(1)}M`;
    }
}


