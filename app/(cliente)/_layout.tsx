import { Tabs } from 'expo-router';
import { Colors } from '@/constants/theme';
import { View } from 'react-native';

// Ícones placeholder — substituir por componentes SVG reais quando implementar as telas
function TabIcon({ focused }: { focused: boolean }) {
  return (
    <View
      style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: focused ? Colors.red : Colors.muted,
        marginTop: 2,
      }}
    />
  );
}

export default function ClienteLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: Colors.muted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.line,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="catalogo"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="meus-pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="agendamentos"
        options={{
          title: 'Agenda',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}
