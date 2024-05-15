export default (start, end, exclusion = []) => {
    const run = (start, end) => Math.random() * (end - start) + start;

    let float = run(start, end);

    while (exclusion.includes(float)) {
        float = run(start, end);
    }

    return float;
}