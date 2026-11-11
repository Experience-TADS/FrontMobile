import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/theme';
import { HomeIcon } from '@/components/icons/HomeIcon';
import { ReceiptIcon } from '@/components/icons/ReceiptIcon';
import { CarIcon } from '@/components/icons/CarIcon';
import { GiftIcon } from '@/components/icons/GiftIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { ClienteHeader } from '@/components/ui/ClienteHeader';

const iconSize = 22;

function tabIcon(Icon: React.FC<{ size?: number; color?: string }>) {
  return ({ focused }: { focused: boolean }) => (
    <Icon size={iconSize} color={focused ? Colors.red : Colors.muted} />
  );
}

export default function ClienteLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: true,
          header: () => <ClienteHeader />,
          tabBarActiveTintColor: Colors.red,
          tabBarInactiveTintColor: Colors.muted,
          tabBarStyle: {
            backgroundColor: Colors.surface,
            borderTopColor: Colors.line,
            borderTopWidth: 1,
            height: 68,
            paddingBottom: 10,
            paddingTop: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 16,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 2,
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
          name="meus-pedidos"
          options={{
            title: 'Pedidos',
            tabBarIcon: tabIcon(ReceiptIcon),
          }}
        />
        <Tabs.Screen
          name="rastreamento"
          options={{
            title: 'Veículos',
            tabBarIcon: tabIcon(CarIcon),
          }}
        />
        <Tabs.Screen
          name="recompensas"
          options={{
            title: 'Bônus',
            tabBarIcon: tabIcon(GiftIcon),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: tabIcon(UserIcon),
          }}
        />

        <Tabs.Screen name="catalogo" options={{ href: null }} />
        <Tabs.Screen name="agendamentos" options={{ href: null }} />
        <Tabs.Screen name="pedido" options={{ href: null }} />
      </Tabs>
    </>
  );
}
