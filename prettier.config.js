module.exports = {
    printWidth: 80,
    semi: false,
    bracketSameLine: true,
    trailingComma: 'all',
    tabWidth: 4,
    singleQuote: true,
    bracketSpacing: false,
    arrowParens: 'always',
    singleAttributePerLine: true,
    plugins: ['prettier-plugin-tailwindcss'],
    tailwindConfig: './styles/tailwind.config.js',
}
