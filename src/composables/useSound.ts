import type { Ref } from 'vue'
export const useSound = () => {
    const volume: Ref<number> = useState(() => 0)
    const updateVolume = (volume: Ref<number>) => (value: number) => {
        volume.value = value;
    }
    const bpm: Ref<number> = useState(() => 120)
    const updateBpm = (bpm: Ref<number>) => (value: number) => {
        bpm.value = value;
    }
    return {
        volume: readonly(volume),
        bpm: readonly(bpm),
        updateVolume: updateVolume(volume),
        updateBpm: updateBpm(bpm)
    }
}