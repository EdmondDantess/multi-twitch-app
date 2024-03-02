module.exports = {
    ...require('eslint-config-standard-typescript-prettier/prettier'),
    plugins: ['prettier-plugin-tailwindcss'],
    semi: false, // This is how you turn off semicolons, by the way
}
