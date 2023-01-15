<script lang="ts" setup>
import * as Tone from 'tone'
import { InstrumentsIF, InstrumentType, RangeCtrlType } from '../utils/types'
const loopRef = ref<Tone.LoopOptions | null>(null)
const Instruments = reactive<{ [key: number]: InstrumentsIF }>(
  {
    1: { kick: true, hihat: true },
    2: { hihat: true },
    3: { snare: true, hihat: true },
    4: { hihat: true },
    5: { kick: true, hihat: true },
    6: { hihat: true },
    7: { snare: true, hihat: true },
    8: { hihat: true },
    9: { kick: true, hihat: true, snare: false },
    10: { hihat: true },
    11: { snare: true, hihat: true },
    12: { hihat: true },
    13: { kick: true, hihat: true },
    14: { hihat: true },
    15: { snare: true, hihat: true },
    16: { hihat: true },
  }
)

const count = ref<number>(1)
const toneState = ref<boolean>(false)
const { bpm, volume, updateVolume, updateBpm } = useSound()

const init = () => {
  const kick = new Tone.MembraneSynth().toDestination();
  const snare = new Tone.NoiseSynth().toDestination();
  snare.envelope.attack = 0.001;
  snare.envelope.decay = 0.2;
  const hihat = new Tone.NoiseSynth(
    {
      envelope: {
        attack: 0.001 ,
        decay: 0.03 ,
        sustain: 0
      }
    }
  ).toDestination();
  return { kick, snare, hihat };
}

const onLoopToggle = () => {
  if (!loopRef.value) {
    const { kick, snare, hihat } = init();
    const loop = new Tone.Loop((time) => {
      if (Instruments[count.value].kick) {
        kick.triggerAttackRelease('C0','16n');
      }
      if (Instruments[count.value].hihat) {
        hihat.triggerAttackRelease('32n');
      }
      if (Instruments[count.value].snare) {
        snare.triggerAttackRelease('16n');
      }
      if (count.value === 16) {
        count.value = 1;
      } else {
        count.value++;
      }
    }, "8n").start(0);
    Tone.Transport.bpm.value = bpm.value;
    loopRef.value = loop;
  }
  Tone.Transport.toggle()
  toneState.value = Tone.Transport.state === 'started' ? true : false;
}

const onInstrumentBtnClick = ($event: Event, key: number, part: InstrumentType) => {
  Instruments[key][part] = !(!!Instruments[key][part]);
  if (!Instruments[key][part] || toneState.value) return;
  const { kick, snare, hihat } = init();
  switch(part) {
    case 'kick':
      kick.triggerAttackRelease('C0','16n');
      break;
    case 'snare':
      snare.triggerAttackRelease('16n');
      break;
    case 'hihat':
      hihat.triggerAttackRelease('32n');
      break;
    default:
      break;
  }
}

const onRangeInputChange = ($event: Event, action: RangeCtrlType) => {
  const { target } = $event;
  if (!(target instanceof HTMLInputElement)) return
  switch(action) {
    case 'bpm':
      Tone.Transport.bpm.value = Number(target.value)
      updateBpm(Number(target.value));
      break;
    case 'volume':
      Tone.getDestination().volume.value = Number(target.value);
      updateVolume(Number(target.value));
      break;
    default:
      break;
  }
}
</script>
<template>
  <div class="wrap">
    <div class="stepSeq">
      <InstrumentsMenu 
        :toneState="toneState"
        :bpm="bpm"
        :volume="volume"
        @onLoopToggle="onLoopToggle"
        @onRangeInputChange="onRangeInputChange"
      />
      <InstrumentsList
        :Instruments="Instruments"
        :count="count"
        :toneState="toneState"
        @onInstrumentBtnClick="onInstrumentBtnClick"
      />
    </div>
  </div>
</template>

<style scoped>
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

.wrap {
  text-align: center;
}

.stepSeq {
  background-color: #1d1d1d;
  display: inline-block;
  padding: 10px;
}
</style>
