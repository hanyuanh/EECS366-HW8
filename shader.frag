//Shader for Phong Illuminations and Phong shading

uniform vec3 AmbientContribution,DiffuseContribution,SpecularContribution;
uniform float exponent;
uniform sampler2D baseMap;
uniform int mapMode;

varying vec3 fvNormal, fvLight, fvView, fvHalfway;
varying vec2 Texcoord;

vec3 AmbientComponent(void)
{
   return vec3(AmbientContribution + 0.1);
}

vec3 DiffuseComponent(void)
{
   return vec3(DiffuseContribution * max(0.0, dot(fvNormal, fvLight)));
}

vec3 SpecularComponent(void)
{   
      // Approximation to the specular reflection using the halfway vector
      
      return vec3(SpecularContribution * pow(max(0.0, dot(fvNormal, fvHalfway)), exponent));  
}

/*
===============================================================================
   Phong Shading: Fragment Program
===============================================================================
*/

void main(void)
{
      
   fvNormal = normalize(fvNormal);
   fvView = normalize(fvView);
   fvLight = normalize(fvLight);
   // Phong Illumination Model
   vec4  fvBaseColor = texture2D( baseMap, Texcoord );
   
   vec3 color = color = AmbientComponent() * fvBaseColor.xyz + DiffuseComponent() * fvBaseColor.xyz + SpecularComponent();
   
   gl_FragColor = vec4(color, 1.0);
}
