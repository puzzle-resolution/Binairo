export function registerWorkerWithBlob(config: {
    scriptStr: string,
    postMessageStr: string;
    onMessage: (this: Worker, ev: MessageEvent) => any,
}) {
    const { scriptStr, postMessageStr, onMessage } = config;
    const blob = new Blob([scriptStr], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    worker.onmessage = onMessage;
    worker.postMessage(postMessageStr);
}