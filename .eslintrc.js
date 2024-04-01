module.exports = {
		"env": {
				"node": true,
				"es6": true
		},
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 8
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-console": "off",
        "no-constant-condition": "off",
        "no-control-regex": "off",
        "quotes": "off",
        "semi": [
            "error",
            "always"
        ]
    }
};