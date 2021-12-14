export abstract class ColorHelper {

    public static hexToRgb(hex) {
        return (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g'))
            .map(l => parseInt(hex.length % 2 ? l + l : l, 16))
    }
}