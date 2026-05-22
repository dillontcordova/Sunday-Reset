import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { SectionCard } from '../components/shared/SectionCard';
import { useResetStore } from '../store/resetStore';
import type { ResetStep } from '../features/reset/types/reset.types';

const steps: ResetStep[] = ['brain-unload', 'reflection', 'recenter', 'choose-week', 'closure'];

export function ResetPage() {
  const { currentStep, currentSession, setStep, updateSession, completeSession } = useResetStore();
  const stepIndex = steps.indexOf(currentStep);
  const next = () => stepIndex < steps.length - 1 ? setStep(steps[stepIndex + 1]) : completeSession();
  const prev = () => stepIndex > 0 && setStep(steps[stepIndex - 1]);
  const title = useMemo(() => ({ 'brain-unload': 'Brain Unload', reflection: 'Reflection', recenter: 'Re-Center', 'choose-week': 'Choose the Week', closure: 'Closure' }[currentStep]), [currentStep]);

  return <SectionCard title={title}><motion.div key={currentStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
    {currentStep === 'brain-unload' && <textarea className="w-full rounded-xl border p-3" rows={5} value={currentSession.unload.join('\n')} onChange={(e)=>updateSession((s)=>({...s, unload:e.target.value.split('\n').filter(Boolean)}))} placeholder="What's still sitting in your head?"/>}
    {currentStep === 'reflection' && <div className="space-y-2">{(['mattered','drained','peace','avoidNextWeek'] as const).map((k)=><textarea key={k} className="w-full rounded-xl border p-2" rows={2} value={currentSession.reflections[k]} placeholder={k} onChange={(e)=>updateSession((s)=>({...s, reflections:{...s.reflections,[k]:e.target.value}}))}/> )}</div>}
    {currentStep === 'recenter' && <div className="space-y-2">{(['family','meals','finances','faith','schedule','relationships'] as const).map((k)=><input key={k} className="w-full rounded-xl border p-2" value={currentSession.recenter[k]} placeholder={k} onChange={(e)=>updateSession((s)=>({...s, recenter:{...s.recenter,[k]:e.target.value}}))}/> )}</div>}
    {currentStep === 'choose-week' && <div className="space-y-2">{currentSession.focuses.topThree.map((v,i)=><input key={i} className="w-full rounded-xl border p-2" value={v} placeholder={`Top focus ${i+1}`} onChange={(e)=>updateSession((s)=>({...s, focuses:{...s.focuses, topThree:s.focuses.topThree.map((item,idx)=>idx===i?e.target.value:item)}}))}/>)}<input className="w-full rounded-xl border p-2" value={currentSession.focuses.simplify} placeholder="One thing to simplify" onChange={(e)=>updateSession((s)=>({...s, focuses:{...s.focuses,simplify:e.target.value}}))}/></div>}
    {currentStep === 'closure' && <textarea className="w-full rounded-xl border p-3" rows={4} value={currentSession.closure.closingThought} onChange={(e)=>updateSession((s)=>({...s, closure:{...s.closure,closingThought:e.target.value}}))} placeholder="You do not have to carry everything at once."/>}
  </motion.div>
  <div className="mt-4 flex justify-between"><button onClick={prev} disabled={stepIndex===0} className="rounded-xl border px-3 py-2 disabled:opacity-40">Back</button><button onClick={next} className="rounded-xl bg-calm-accent px-4 py-2 text-white">{stepIndex===steps.length-1?'Complete reset':'Continue'}</button></div>
  </SectionCard>;
}
