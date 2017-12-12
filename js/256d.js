function encodeImg(img) {
    var v = img2vec(img);
    var m = vec2mat(v, 280, 280);
    var pool = meanpool(m, 10);
    var x = mat2vec(pool);
    var feature = matsigmoid(fc([x], encoder_W, [encoder_b]));
    return mat2vec(feature);
}

function decodeFeature(f) {
    var y = matsigmoid(fc([f], decoder_W, [decoder_b]));
    y =  mat2vec(y);
    var m = vec2mat(y, 28, 28);
    var unpool = nearestunpool(m, 10);
    var v = mat2vec(unpool);
    return vec2img(v);
}