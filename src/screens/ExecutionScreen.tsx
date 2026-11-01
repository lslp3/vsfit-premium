import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useWorkoutStore } from '../store/workoutStore';
import { triggerHaptic } from '../utils/haptics';

const { width, height } = Dimensions.get('window');

export default function ExecutionScreen() {
  const videoRef = useRef<Video>(null);
  const { currentPlan, activeDayIndex, currentExerciseIndex, startRest, stopRest, isResting, restEndTime } = useWorkoutStore();
  const [timeLeft, setTimeLeft] = useState(0);

  const currentDay = currentPlan?.days[activeDayIndex];
  const currentExercise = currentDay?.exercises[currentExerciseIndex];

  // Lógica do Timer Robusto (Timestamp Absoluto)
  useEffect(() => {
    if (!isResting || !restEndTime) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((restEndTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        triggerHaptic('success');
        stopRest();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isResting, restEndTime, stopRest]);

  if (!currentExercise) return <View className="flex-1 bg-background items-center justify-center"><Text className="text-white">Carregando...</Text></View>;

  return (
    <View className="flex-1 bg-background">
      {/* Área do Vídeo */}
      <View className="relative w-full" style={{ height: height * 0.55 }}>
        <Video
          ref={videoRef}
          source={{ uri: currentExercise.videoUrl || 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }} // Placeholder
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          className="w-full h-full"
        />
        <LinearGradient colors={['transparent', '#050505']} className="absolute bottom-0 w-full h-32" />
        
        {/* Badge de Técnica Flutuante */}
        {currentExercise.technique && currentExercise.technique !== 'normal' && (
          <View className="absolute top-12 right-6 bg-accent px-4 py-2 rounded-full flex-row items-center gap-2 shadow-lg shadow-accent/30">
            <Text className="text-white font-black text-xs uppercase tracking-wider">⚡ {currentExercise.technique.replace('_', ' ')}</Text>
          </View>
        )}
      </View>

      {/* Painel de Controle Glassmorphism */}
      <View className="flex-1 -mt-8 px-6 pb-8 z-10">
        <View className="flex-1 bg-surface/90 backdrop-blur-xl rounded-[32px] p-6 border border-white/10 shadow-2xl">
          
          {/* Título */}
          <View className="mb-6">
            <Text className="text-3xl font-black text-white tracking-tight">{currentExercise.name}</Text>
            <Text className="text-zinc-400 text-sm mt-1">{currentExercise.equipment} • {currentExercise.muscleGroup}</Text>
          </View>

          {/* Visualização Drop Set */}
          {currentExercise.technique === 'drop_set' && (
            <View className="bg-black/40 rounded-2xl p-4 mb-6 border border-white/5">
              <Text className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3">Progressão de Carga</Text>
              <View className="space-y-2">
                <View className="flex-row items-center gap-3">
                  <View className="flex-1 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                  <Text className="text-xs font-mono font-bold text-white w-12 text-right">{currentExercise.weight}kg</Text>
                </View>
                <View className="flex-row items-center gap-3 opacity-60">
                  <View className="flex-1 h-1.5 bg-zinc-700 rounded-full" />
                  <Text className="text-xs font-mono font-bold text-zinc-400 w-12 text-right">{Math.round(currentExercise.weight! * 0.8)}kg</Text>
                </View>
              </View>
            </View>
          )}

          {/* Inputs Rápidos */}
          <View className="flex-row gap-3 mb-6">
            <View className="flex-1 bg-black/40 rounded-2xl p-3 items-center border border-white/5">
              <Text className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Peso</Text>
              <Text className="text-xl font-bold font-mono text-white">{currentExercise.weight}<Text className="text-xs text-zinc-600">kg</Text></Text>
            </View>
            <View className="flex-1 bg-black/40 rounded-2xl p-3 items-center border border-white/5">
              <Text className="text-[10px] text-zinc-500 uppercase font-bold mb-1">Reps</Text>
              <Text className="text-xl font-bold font-mono text-white">{currentExercise.reps}</Text>
            </View>
          </View>

          {/* Timer Imersivo */}
          <View className="flex-row items-center justify-between bg-zinc-800/50 rounded-[24px] p-3 pl-5 border border-white/5 mt-auto">
            <View className="flex-row items-center gap-4">
              <View className="w-12 h-12 rounded-full border-3 border-zinc-700 items-center justify-center relative">
                 {/* Aqui entraria o CircularProgress animado do Reanimated */}
                <Text className="text-sm font-bold font-mono text-success">{isResting ? `${timeLeft}s` : '---'}</Text>
              </View>
              <View>
                <Text className="text-[10px] text-zinc-500 uppercase font-bold">Descanso</Text>
                <Text className="text-sm text-success font-medium">{isResting ? 'Recuperando...' : 'Pronto'}</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              onPress={() => {
                triggerHaptic('light');
                startRest(currentExercise.restSeconds);
              }}
              className="bg-white px-6 py-3 rounded-2xl active:scale-95 transition-transform"
            >
              <Text className="text-black font-bold text-sm">{isResting ? 'PULAR' : 'INICIAR DESCANSO'}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
}