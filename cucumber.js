/**
 * Cucumber.js configuration for AdvancePlaywrightFramework2x.
 *
 * Profiles map to the npm scripts in package.json:
 *   npm run cucumber:level0  →  --profile level0
 *   npm run cucumber:level1  →  --profile level1
 *   npm run cucumber:level2  →  --profile level2
 */

const common = {
    /** Step definitions, hooks, and world (loaded before scenarios). */
    require: ['src/cucumber/support/world.ts', 'src/cucumber/support/hooks.ts'],
    /** tsx handles TypeScript + path aliases (replaces ts-node + tsconfig-paths). */
    requireModule: ['tsx/cjs'],
    /** Output format. */
    format: ['progress-bar', 'html:cucumber-report.html'],
    /** Default timeout per step (ms). */
    timeout: 60_000,
};

module.exports = {
    default: {
        ...common,
        paths: ['src/cucumber/**/*.feature'],
        require: [
            ...common.require,
            'src/cucumber/**/steps/*.steps.ts',
        ],
    },

    level0: {
        ...common,
        paths: ['src/cucumber/level-00-installation/**/*.feature'],
        require: [
            ...common.require,
            'src/cucumber/level-00-installation/steps/*.steps.ts',
        ],
    },

    level1: {
        ...common,
        paths: ['src/cucumber/level-01-basic/**/*.feature'],
        require: [
            ...common.require,
            'src/cucumber/level-01-basic/steps/*.steps.ts',
        ],
    },

    level2: {
        ...common,
        paths: ['src/cucumber/level-02-data-driven/**/*.feature'],
        require: [
            ...common.require,
            'src/cucumber/level-01-basic/steps/*.steps.ts',
            'src/cucumber/level-02-data-driven/steps/*.steps.ts',
        ],
    },
};