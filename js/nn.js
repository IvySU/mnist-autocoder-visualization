function sigmoid(x) {
    return Math.exp(x) / (Math.exp(x) + 1)
}

function vecsigmoid(A) {
    var m = A.length;
    var V = A;
    for (var i = 0; i < m; i++) {
        V[i] = sigmoid(A[i])
    }
    return V;
}

function matsigmoid(A) {
    var m = A.length;
    var n = A[0].length;
    var M = A;
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            M[i][j] = sigmoid(A[i][j])
        }
    }
    return M;
}

function fc(V, W, b) {
    return matadd(matmul(V, W), b);
}

function meanpool(A, k) {
    var m = A.length / k;
    var n = A[0].length / k;
    var M = [];
    for (var i = 0; i < m; i++) {
        M[i] = [];
        for (var j = 0; j < n; j++) {
            M[i][j] = 0;
            for (var ii = 0; ii < k; ii++) {
                for (var jj = 0; jj < k; jj++) {
                    M[i][j] += A[i*k+ii][j*k+jj];
                }
            }
            M[i][j] = M[i][j] / (k * k);
        }
    }
    return M
}

function nearestunpool(A, k) {
    var m = A.length * k;
    var n = A[0].length * k;
    var M = [];
    for (var i = 0; i < m; i++) {
        M[i] = [];
        for (var j = 0; j < n; j++) {
            M[i][j] = A[Math.floor(i/k)][Math.floor(j/k)];
        }
    }
    return M;
}