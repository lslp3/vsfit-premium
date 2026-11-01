import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutDay, WorkoutExercise } from '../types';

// Dados Mockados para demonstração visual
const MOCK_DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
const INITIAL_EXERCISES: WorkoutExercise[] = [
  { id: '1', name: 'Agachamento Livre', muscleGroup: 'Pernas', equipment: 'Barra', sets: 4, reps: 10, restSeconds: 90, weight: 60, technique: 'normal' },
  { id: '2', name: 'Leg Press 45', muscleGroup: 'Pernas', equipment: 'Máquina', sets: 3, reps: 12, restSeconds: 60, weight: 120, technique: 'drop_set' },
];

export default function BuilderScreen() {
  const [activeDay, setActiveDay] = useState('SEG');
  const [exercises, setExercises] = useState(INITIAL_EXERCISES);

  const updateExercise = (id: string, field: keyof WorkoutExercise, value: any) => {
    setExercises(prev => prev.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };

  const renderExerciseCard = ({ item }: { item: WorkoutExercise }) => (
    <View className="bg-surface border border-white/5 rounded-[24px] p-5 mb-4 shadow-lg">
      {/* Header do Card */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-row items-center gap-3 flex-1">
          <View className="w-10 h-10 bg-zinc-800 rounded-xl items-center justify-center">
            <Ionicons name="barbell-outline" size={20} color="#a1a1aa" />
          </View>
          <View className="flex-1">
            <Text className="text-white font-bold text-lg leading-tight">{item.name}</Text>
            <Text className="text-zinc-500 text-xs mt-0.5">{item.muscleGroup} • {item.equipment}</Text>
          </View>
          <TouchableOpacity onPress={() => setExercises(prev => prev.filter(e => e.id !== item.id))}>
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Steppers Inline Minimalistas */}
      <View className="bg-black/30 rounded-2xl p-3 flex-row justify-between items-center border border-white/5 mb-4">
        <View className="flex-row items-center gap-4">
          {/* Séries */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => updateExercise(item.id, 'sets', Math.max(1, item.sets - 1))} className="w-8 h-8 rounded-full bg-zinc-800 items-center justify-center">
              <Text className="text-zinc-400 font-bold text-lg">-</Text>
            </TouchableOpacity>
            <View className="items-center w-8">
              <Text className="text-[10px] text-zinc-600 uppercase font-bold">Séries</Text>
              <Text className="text-lg font-bold font-mono text-white">{item.sets}</Text>
            </View>
            <TouchableOpacity onPress={() => updateExercise(item.id, 'sets', item.sets + 1)} className="w-8 h-8 rounded-full bg-zinc-800 items-center justify-center">
              <Text className="text-white font-bold text-lg">+</Text>
            </TouchableOpacity>
          </View>
          
          <View className="w-px h-8 bg-white/10" />

          {/* Repetições */}
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => updateExercise(item.id, 'reps', Math.max(1, item.reps - 1))} className="w-8 h-8 rounded-full bg-zinc-800 items-center justify-center">
              <Text className="text-zinc-400 font-bold text-lg">-</Text>
            </TouchableOpacity>
            <View className="items-center w-8">
              <Text className="text-[10px] text-zinc-600 uppercase font-bold">Reps</Text>
              <Text className="text-lg font-bold font-mono text-white">{item.reps}</Text>
            </View>
            <TouchableOpacity onPress={() => updateExercise(item.id, 'reps', item.reps + 1)} className="w-8 h-8 rounded-full bg-zinc-800 items-center justify-center">
              <Text className="text-white font-bold text-lg">+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-[10px] text-zinc-600 uppercase font-bold">Descanso</Text>
          <Text className="text-lg font-bold font-mono text-emerald-400">{item.restSeconds}s</Text>
        </View>
      </View>

      {/* Chips de Técnica */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2 pb-1">
        {['normal', 'drop_set', 'bi_set', 'rest_pause', 'pyramid'].map((tech) => (
          <TouchableOpacity 
            key={tech}
            onPress={() => updateExercise(item.id, 'technique', tech)}
            className={`px-4 py-2 rounded-full border ${
              item.technique === tech 
                ? tech === 'drop_set' ? 'bg-orange-500/20 border-orange-500/50' 
                : tech === 'bi_set' ? 'bg-purple-500/20 border-purple-500/50'
                : 'bg-white/10 border-white/20'
                : 'bg-zinc-900 border-zinc-800'
            }`}
          >
            <Text className={`text-xs font-bold capitalize ${
              item.technique === tech ? 'text-white' : 'text-zinc-500'
            }`}>
              {tech.replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="px-6 pt-14 pb-4 bg-background/90 backdrop-blur-sm z-10 border-b border-white/5">
        <Text className="text-zinc-500 text-xs uppercase tracking-widest font-bold mb-1">Montar Treino</Text>
        <View className="flex-row justify-between items-end">
          <Text className="text-2xl font-bold text-white">Hipertrofia A</Text>
          <TouchableOpacity className="bg-primary px-5 py-2 rounded-full shadow-lg shadow-primary/20">
            <Text className="text-white font-bold text-sm">Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seletor de Dias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-4 border-b border-white/5">
        {MOCK_DAYS.map(day => (
          <TouchableOpacity 
            key={day} 
            onPress={() => setActiveDay(day)}
            className={`w-14 h-16 rounded-2xl mr-3 flex-col items-center justify-center ${
              activeDay === day ? 'bg-primary/20 border border-primary/50' : 'bg-surface border border-zinc-800'
            }`}
          >
            <Text className={`text-[10px] font-bold uppercase ${activeDay === day ? 'text-primary' : 'text-zinc-500'}`}>{day}</Text>
            <Text className={`text-lg font-black ${activeDay === day ? 'text-primary' : 'text-zinc-600'}`}>A</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de Exercícios */}
      <FlatList
        data={exercises}
        renderItem={renderExerciseCard}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        ListFooterComponent={
          <TouchableOpacity className="w-full py-4 rounded-[24px] border-2 border-dashed border-zinc-800 items-center justify-center flex-row gap-2 mt-2">
            <Ionicons name="add-circle-outline" size={20} color="#71717a" />
            <Text className="text-zinc-500 font-bold text-sm">Adicionar Exercício</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}