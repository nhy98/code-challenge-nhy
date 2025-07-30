function sum_to_n_a(n: number): number {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer");
    }
    return (n * (n + 1)) / 2;
}

function sum_to_n_b(n: number): number {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer");
    }
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sum_to_n_c(n: number): number {
    if (n < 0) {
        throw new Error("Input must be a non-negative integer");
    }
    if (n == 0) {
        return 0;
    }
    return n + sum_to_n_c(n - 1);
}

// Test cases
console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15