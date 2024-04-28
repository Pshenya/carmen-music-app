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


