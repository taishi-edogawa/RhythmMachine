<script setup lang="ts">
import { RangeCtrlType } from '../utils/types'
withDefaults(defineProps<{
    toneState: boolean,
    bpm: number,
    volume: number
}>(), {
    toneState: false,
    bpm: 120,
    volume: 0
})
const emits = defineEmits(['onLoopToggle', 'onRangeInputChange'])

const onClick = () => {
    emits('onLoopToggle')
}

const onInput = ($event: Event, action: RangeCtrlType) => {
    emits('onRangeInputChange', $event, action)
}
</script>
<template>
    <ul class="menu">
        <li class="toggle" :class="{ active: toneState }">
            <span v-if="toneState">stop</span>
            <span v-else>play</span>
            <button @click="onClick()" ></button>
        </li>
        <li class="bpm">
            <span >bpm {{ bpm }}</span>
            <input type="range" min="40" max="240" @input="onInput($event, 'bpm')" :value="bpm" />
        </li>
        <li class="volume">
            <span >volume {{ volume + 100 }}</span>
            <input type="range" min="-100" max="0" @input="onInput($event, 'volume')" :value="volume" />
        </li>
    </ul>
</template>

<style scoped>
.menu {
    display: flex;
    margin-bottom: 10px;
}

.menu li {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    width: 100px;
}

.menu li.toggle {
    width: 100px;
    margin-right: 20px;;
}

.menu li.bpm,
.menu li.volume {
    width: 160px;
    position: relative;
}

.menu li.bpm input,
.menu li.volume input {
    position: absolute;
    top: calc(50% + 6px);
}

.menu li.bpm span,
.menu li.volume span {
    width: 140px;
}

.menu li button {
    background-color: #e1e1e1;
    width: 80px;
    height: 80px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.menu li span {
    background-color: #e1e1e1;
    width: 100%;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
    border-radius: 3px 3px 0 0;
}

.menu li.active button,
.menu li.active span {
    background-color: #ffa280;
}
</style>