attribute vec2 aPos;

void main() {
  gl_Position = vec4(aPos, 0., 1.);
}
