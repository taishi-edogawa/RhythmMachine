<script setup lang="ts">
import { InstrumentsIF, InstrumentType } from '../utils/types'
defineProps<{
    Instruments: { [key: number]: InstrumentsIF },
    count: number,
    toneState: boolean
}>()
const emits = defineEmits(['onInstrumentBtnClick'])
const onClick = ($event: Event, key: number, part: InstrumentType) => {
    emits('onInstrumentBtnClick', $event, key, part)
}
</script>
<template>
    <div class="instruments">
        <ul class="hihat instrument">
            <li
                v-for="(value, key) in Instruments"
                :key="key"
                :class="{
                    active: value.hihat,
                    playing: count === Number(key) + 1 && toneState
                }"
                @click="onClick($event, key, 'hihat')"
            >
            </li>
        </ul>
        <ul class="snare instrument">
            <li
                v-for="(value, key) in Instruments"
                :key="key"
                :class="{
                    active: value.snare,
                    playing: count === Number(key) + 1 && toneState
                }"
                @click="onClick($event, key, 'snare')"
            >
            </li>
        </ul>
        <ul class="kick instrument">
            <li
                v-for="(value, key) in Instruments"
                :key="key"
                :class="{
                    active: value.kick,
                    playing: count === Number(key) + 1 && toneState
                }"
                @click="onClick($event, key, 'kick')"
            >
            </li>
        </ul>
        <div class="verticalLine line1"></div>
        <div class="verticalLine line2"></div>
        <div class="verticalLine line3"></div>
    </div>
</template>

<style scoped>
.instruments {
    position: relative;
}

.instrument {
    margin: 0 0 10px 0;
    padding: 0;
    display: flex;
}

.instrument:last-of-type {
    margin: 0;
}

.instrument li {
    list-style: none;
    width: 50px;
    height: 50px;
    background-color: #eeedf0;
    margin-right: 11px;
    cursor: pointer;
}

.instrument li:last-of-type {
    margin: 0;
}

.instrument li:nth-of-type(4),
.instrument li:nth-of-type(8),
.instrument li:nth-of-type(12) {
    margin-right: 21px;
}

.instrument li.active {
    background-color: #c1c1c1;
}

.instrument li.playing {
    background-color: #ebc6b8 !important;
    box-shadow:0px 0px 10px 1px #fff inset;
}

.verticalLine {
    position: absolute;
    width: 1px;
    height: 180px;
    background-color: #bbb;
    z-index: 100;
    top: 0;
}

.line1 {
    left: 243px;
}
.line2 {
    left: 497px;
}
.line3 {
    left: 751px;
}
</style>