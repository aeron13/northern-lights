const frag = `
  #ifdef GL_ES
  precision mediump float;
  #endif

	uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

	${includes}

	varying vec2 v_texcoord;

void main(void)
{
    vec2 uv = v_texcoord;

		vec2 mouse = u_mouse / u_resolution;
    float dist = distance(uv, mouse);
    float strength = smoothstep(0.7, 0.0, dist);

    float hue = 0.25;
    
    vec3 h1 = vec3(hue - strength * 0.08, 1.0, 0.4 + strength * 0.2);
    vec3 h2 = vec3(0.6, 0.5, 0.2);
    
    vec3 rgb1 = hsv2rgb(h1);
    vec3 rgb2 = hsv2rgb(h2);
    
    vec4 color1 = vec4(rgb1, 1.0);
    vec4 color2 = vec4(rgb2, 1.0);

    float grain = rand(uv * 100.0);
    grain = grain * mix(0.2, 0.01, strength);

    vec2 movement = vec2(u_time * 0.005, u_time * -0.005);
    movement *= rotate2d(u_time * 0.0005);
    
    float f = fbm( uv + movement );
    f *= 10.0;
    // f += grain;
    f += u_time * 0.3;
    f = fract(f);
    
		float gap = mix(0.6, 0.1, strength);
    float mixer = smoothstep(0.0, gap, f) - smoothstep(1.0 - gap, 1.0, f);

    vec4 color = mix(color1, color2, mixer );
    
    gl_FragColor = color;
}
`