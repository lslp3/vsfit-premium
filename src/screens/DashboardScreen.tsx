import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-background px-6 pt-14 pb-24" showsVerticalScrollIndicator={false}>
      
      {/* Header com Perfil */}
      <View className="flex-row justify-between items-center mb-8">
        <View className="flex-row items-center gap-3">
          <View className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 p-0.5">
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=veronica' }} className="w-full h-full rounded-full border-2 border-background" />
          </View>
          <View>
            <Text className="text-zinc-500 text-xs font-bold uppercase">Boa Tarde,</Text>
            <Text className="text-xl font-bold text-white">Verônica</Text>
          </View>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-surface border border-zinc-800 items-center justify-center relative">
          <Ionicons name="notifications-outline" size={20} color="#a1a1aa" />
          <View className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full border border-background" />
        </TouchableOpacity>
      </View>

      {/* Widget de Atenção (Destaque) */}
      <View className="bg-gradient-to-br from-orange-900/40 to-red-900/20 border border-orange-500/30 rounded-[32px] p-5 mb-4 overflow-hidden relative">
        <View className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
        
        <View className="flex-row justify-between items-center mb-4 relative z-10">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 rounded-full bg-orange-500/20 items-center justify-center">
              <Ionicons name="alert-circle" size={16} color="#fb923c" />
            </View>
            <Text className="font-bold text-orange-100">Atenção Necessária</Text>
          </View>
          <View className="bg-orange-500/10 px-2 py-1 rounded-lg">
            <Text className="text-xs font-bold text-orange-400">3 alunos</Text>
          </View>
        </View>

        <View className="bg-black/20 p-3 rounded-2xl border border-white/5 flex-row items-center justify-between relative z-10">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-full bg-zinc-700 items-center justify-center">
              <Text className="text-xs font-bold text-white">RS</Text>
            </View>
            <View>
              <Text className="text-sm font-bold text-white">Rosalia Freitas</Text>
              <Text className="text-[10px] text-zinc-400">Sem treino há 12 dias</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-white px-3 py-1.5 rounded-full">
            <Text className="text-xs font-bold text-black">Chamar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bento Grid */}
      <View className="flex-row flex-wrap -mx-2">
        
        {/* Widget Financeiro (Largo) */}
        <View className="w-full px-2 mb-4">
          <View className="bg-surface/60 border border-white/5 rounded-[32px] p-5">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-xs text-zinc-500 uppercase font-bold">Financeiro (30d)</Text>
              <Ionicons name="trending-up" size={16} color="#10b981" />
            </View>
            <View className="flex-row items-end gap-2 mb-3">
              <Text className="text-3xl font-black text-white">R$ 4.250</Text>
              <Text className="text-sm text-emerald-400 font-bold mb-1">+12%</Text>
            </View>
            {/* Sparkline Simulado */}
            <View className="flex-row items-end gap-1 h-8">
              {[40, 60, 50, 80, 70, 100].map((h, i) => (
                <View key={i} className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-emerald-500/30'}`} style={{ height: `${h}%` }} />
              ))}
            </View>
          </View>
        </View>

        {/* Widget Alunos Ativos */}
        <View className="w-1/2 px-2 mb-4">
          <View className="bg-surface/60 border border-white/5 rounded-[32px] p-5 aspect-square justify-between">
            <View className="w-10 h-10 rounded-full bg-blue-500/20 items-center justify-center">
              <Ionicons name="people" size={20} color="#3b82f6" />
            </View>
            <View>
              <Text className="text-3xl font-black text-white">24</Text>
              <Text className="text-xs text-zinc-500 font-bold uppercase mt-1">Alunos Ativos</Text>
            </View>
          </View>
        </View>

        {/* Widget Aderência */}
        <View className="w-1/2 px-2 mb-4">
          <View className="bg-surface/60 border border-white/5 rounded-[32px] p-5 aspect-square justify-between relative overflow-hidden">
            <View className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
            <View className="w-10 h-10 rounded-full bg-purple-500/20 items-center justify-center">
              <Ionicons name="stats-chart" size={20} color="#a855f7" />
            </View>
            <View>
              <Text className="text-3xl font-black text-white">87%</Text>
              <Text className="text-xs text-zinc-500 font-bold uppercase mt-1">Aderência</Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}