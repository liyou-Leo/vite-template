
export const printPretty = (title, text, color) => {
    console.log(
        `%c ${title} %c ${text} %c`,
        `background: ${color}; border: 1px solid ${color}; padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`,
        `border: 1px solid ${color}; padding: 1px;`,
        'background: transparent'
    );
}

export const printAppInfo = () => {
    printPretty('编译时间', import.meta.env.BUILD_TIME, '#1890ff');
    printPretty('当前分支', import.meta.env.GIT_BRANCH, '#19be6b');
}

export const clearWarning = () => {
    if (import.meta.env.MODE === 'development') {
        console.warn = () => { };

        const consoleErrorFun = console.error;
        console.error = function (...args) {
            const message = args.join('');
            if (typeof message === 'string' && message.startsWith('Warning: ')) {
                return;
            }
            consoleErrorFun.apply(this, args);
        };
    }
};