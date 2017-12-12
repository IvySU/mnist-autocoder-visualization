function matadd(A, B) {
    var m = A.length;
    var n = A[0].length;
    var M = A;
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            M[i][j] = A[i][j] + B[i][j]
        }
    }
    return M;
}

function matmul(A, B) {
    var m = A.length;
    var n = B[0].length;
    var l = A[0].length;
    var M = new Array();
    for (var i = 0; i < m; i++) {
        M[i] = new Array();
        for (var j = 0; j < n; j++) {
            M[i][j] = 0;
            for (var k = 0; k < l; k++) {
                M[i][j] += A[i][k] * B[k][j]
            }
        }
    }
    return M;
}

function matt(A) {
    var m = A.length;
    var n = A[0].length;
    var M = new Array();
    for (var i = 0; i < n; i++) {
        M[i] = new Array();
        for (var j = 0; j < m; j++) {
            M[i][j] = A[j][i];
        }
    }
    return M;
}

function mat2vec(A) {
    var m = A.length;
    var n = A[0].length;
    var M = new Array();
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            M[i * n + j] = A[i][j];
        }
    }
    return M;
}

function vec2mat(V, m, n) {
    var M = new Array();
    for (var i = 0; i < m; i++) {
        M[i] = new Array();
        for (var j = 0; j < n; j++) {
            M[i][j] = V[i * n + j];
        }
    }
    return M;
}

function vecadd(A, B) {
    var m = A.length;
    var V = A;
    for (var i = 0; i < m; i++) {
        V[i] = A[i] + B[i];
    }
    return V;
}
