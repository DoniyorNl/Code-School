module.exports = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testEnvironment: 'jest-environment-jsdom',
	preset: undefined,
	moduleNameMapper: {
		// Handle module aliases
		'^@/(.*)$': '<rootDir>/$1',
		'^@/src/(.*)$': '<rootDir>/src/$1',
		// Handle CSS imports (with CSS modules)
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
		// Handle CSS imports (without CSS modules)
		'^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
		// Handle SVG imports
		'^.+\\.svg$': '<rootDir>/__mocks__/svgMock.js',
		// Handle image imports
		'^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i': '<rootDir>/__mocks__/fileMock.js',
	},
	transform: {
		// Use babel-jest to transpile tests with the next/babel preset
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
	},
	collectCoverageFrom: [
		'src/**/*.{js,jsx,ts,tsx}',
		'!src/**/*.d.ts',
		'!src/**/*.stories.{js,jsx,ts,tsx}',
		'!src/**/*.props.ts',
		'!src/**/*.interface.ts',
		'!src/pages/_app.tsx',
		'!src/pages/_document.tsx',
	],
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
	transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
}
