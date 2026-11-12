# FrontMobile

## Backend

As chamadas à API ficam em `services/api.ts`. A URL padrão é
`http://localhost:8080`; para configurar outro endereço, defina
`EXPO_PUBLIC_API_URL` antes de iniciar o Expo.

Emuladores e dispositivos móveis não usam necessariamente o `localhost` do
computador: no emulador Android use `http://10.0.2.2:8080`; em um aparelho
físico, use o endereço IP da máquina que executa o backend.