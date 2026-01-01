// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class PdfUtils {
	static getFontSize(inEm: number, fontSize?: string) {
		return inEm*8;
	}

	static calculateStringLength(inputString: string) {
		const numberOfSmallCharacters = (inputString.match(/[litjr\s]/g) || []).length;
		const numberOfLargeCHaracter = inputString.length - numberOfSmallCharacters;
		return  (numberOfLargeCHaracter * 8) +(numberOfSmallCharacters * 3) ;
	    }
}