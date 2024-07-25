export function shrinkText(text: string, maxLength = 20) {
    const length = text.length

    if (length > maxLength) {
        const reducedText = text.substring(0, maxLength).trim()
        return `${reducedText}...`
    }
    return text
}