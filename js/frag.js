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

    float sky = smoothstep(1.0, 0.0, uv.y);
    
    float skyHue = 0.6;
    float skySat = 0.5 - sky * 0.2;
    float skyBright = 0.1 * sky + 0.1;

    float hue = mix(skyHue, 0.3, uv.y * 0.5 + 0.5 );
    float sat = mix(skySat, 1.0, smoothstep(0.3, 1.0, uv.y) + 0.9 );
    float bright = mix(skyBright, 0.6, smoothstep(0.3, 1.0, uv.y + 0.1)  );
    
    vec3 h1 = vec3( hue - strength * 0.18, sat, bright + strength * 0.2 );
    vec3 h2 = vec3(skyHue, skySat + 0.1, skyBright);
    
    vec3 rgb1 = hsv2rgb(h1);
    vec3 rgb2 = hsv2rgb(h2);
    
    vec4 color1 = vec4(rgb1, 1.0);
    vec4 color2 = vec4(rgb2, 1.0);

    vec2 movement = vec2(u_time * 0.05, u_time * -0.1);
    movement *= rotate2d(u_time * 0.005);
    
    float f = fbm( uv + movement );
    f *= 10.0;
    f += u_time * 0.3;
    f = fract(f);
    
		float gap = mix(0.6, 0.1, strength + 0.1);
    float mixer = smoothstep(0.0, gap, f) - smoothstep(1.0 - gap, 1.0, f);

    vec4 color = mix(color1, color2, mixer );
    
    gl_FragColor = color;
}
`