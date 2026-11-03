import { Tabs } from 'expo-router';
import { Colors } from '@/constants/theme';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { GridIcon } from '@/components/icons/GridIcon';
import { ReceiptIcon } from '@/components/icons/ReceiptIcon';
import { CalendarIcon } from '@/components/icons/CalendarIcon';
import { UserIcon } from '@/components/icons/UserIcon';

const iconSize = 22;

function tabIcon(Icon: React.FC<{ size?: number; color?: string }>) {
  return ({ focused }: { focused: boolean }) =>
    <Icon size={iconSize} color={focused ? Colors.red : Colors.muted} />;
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
          tabBarIcon: tabIcon(HomeIcon),
        }}
      />
      <Tabs.Screen
        name="catalogo"
        options={{
          title: 'Catálogo',
          tabBarIcon: tabIcon(GridIcon),
        }}
      />
      <Tabs.Screen
        name="meus-pedidos"
        options={{
          title: 'Pedidos',
          tabBarIcon: tabIcon(ReceiptIcon),
        }}
      />
      <Tabs.Screen
        name="agendamentos"
        options={{
          title: 'Agenda',
          tabBarIcon: tabIcon(CalendarIcon),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: tabIcon(UserIcon),
        }}
      />
    </Tabs>
  );
}
