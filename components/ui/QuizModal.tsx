import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { Colors, Fonts, Radii } from '@/constants/theme';
import { STATUS, QZ, QPT, qzIdx } from '@/constants/data';

function XIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke={Colors.muted} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

function TrophyIcon() {
  return (
    <Svg width={34} height={34} viewBox="0 0 24 24" fill="none"
      stroke={Colors.red} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 20h8M10 17h4" />
    </Svg>
  );
}

interface Props {
  visible: boolean;
  statusKey: string;
  onClose: () => void;
}

export function QuizModal({ visible, statusKey, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const questions = QZ[statusKey] ?? [];
  const statusLabel = STATUS.find(s => s.k === statusKey)?.l ?? '';

  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  function reset() {
    setIdx(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function pick(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[idx].a) setScore(s => s + 1);
  }

  function next() {
    if (idx < questions.length - 1) {
      setIdx(i => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  const cur = questions[idx];
  const answered = selected !== null;
  const pts = score * QPT + (score === questions.length ? QPT : 0);
  const maxPts = questions.length * QPT + QPT;

  function optStyle(i: number) {
    if (!answered) return s.opt;
    if (i === cur.a) return [s.opt, s.optOk];
    if (i === selected) return [s.opt, s.optBad];
    return s.opt;
  }

  if (!visible || questions.length === 0) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" statusBarTranslucent onRequestClose={handleClose}>
      <View style={s.overlay}>
        <View style={[s.box, { paddingTop: insets.top + 16 }]}>

          {finished ? (
            /* ── Resultado final ── */
            <View style={s.finishedWrap}>
              <View style={[s.icoBox, { backgroundColor: Colors.redTint }]}>
                <TrophyIcon />
              </View>
              <Text style={s.finishedPts}>+{pts} pts</Text>
              <Text style={s.finishedMsg}>
                Você acertou {score} de {questions.length} em {statusLabel.toLowerCase()}.
                {score === questions.length ? ' Bônus por acertar todas incluído.' : ''}
              </Text>
              <View style={s.finishedActions}>
                <TouchableOpacity style={s.btnGhost} onPress={handleClose} activeOpacity={0.8}>
                  <Text style={s.btnGhostText}>Fechar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.btnPrimary} onPress={handleClose} activeOpacity={0.85}>
                  <Text style={s.btnPrimaryText}>Ver recompensas</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            /* ── Pergunta ── */
            <>
              <View style={s.header}>
                <Text style={s.title}>Quiz · {statusLabel}</Text>
                <TouchableOpacity onPress={handleClose} style={s.closeBtn} activeOpacity={0.7}>
                  <XIcon />
                </TouchableOpacity>
              </View>

              <View style={s.steps}>
                {questions.map((_, i) => (
                  <View key={i} style={[s.step, i <= idx && s.stepOn]} />
                ))}
              </View>

              <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <Text style={s.stepLabel}>Pergunta {idx + 1} de {questions.length}</Text>
                <Text style={s.question}>{cur.q}</Text>

                <View style={s.opts}>
                  {cur.o.map((opt, i) => (
                    <TouchableOpacity
                      key={i}
                      style={optStyle(i)}
                      onPress={() => pick(i)}
                      activeOpacity={answered ? 1 : 0.7}
                      disabled={answered}
                    >
                      <Text style={s.optText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {answered && (
                  <>
                    <View style={s.feedback}>
                      <Text style={[s.feedbackVerdict, {
                        color: selected === cur.a ? Colors.ok : Colors.err,
                      }]}>
                        {selected === cur.a ? 'Correto. ' : 'Não foi dessa vez. '}
                      </Text>
                      <Text style={s.feedbackExp}>{cur.e}</Text>
                    </View>
                    <TouchableOpacity style={s.btnPrimaryFull} onPress={next} activeOpacity={0.85}>
                      <Text style={s.btnPrimaryText}>
                        {idx < questions.length - 1 ? 'Próxima pergunta' : 'Ver resultado'}
                      </Text>
                    </TouchableOpacity>
                  </>
                )}

                <View style={{ height: 40 }} />
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10,10,10,0.55)',
    justifyContent: 'flex-end',
  },
  box: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    maxHeight: '92%',
    flex: 1,
  },

  /* header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: Fonts.extraBold,
    fontSize: 20,
    color: Colors.ink,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    backgroundColor: Colors.soft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* steps */
  steps: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  step: { flex: 1, height: 6, borderRadius: 99, backgroundColor: Colors.line },
  stepOn: { backgroundColor: Colors.red },
  stepLabel: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.muted,
    marginBottom: 6,
  },

  /* pergunta */
  question: {
    fontFamily: Fonts.extraBold,
    fontSize: 18,
    color: Colors.ink,
    lineHeight: 26,
    marginBottom: 20,
  },

  /* opções */
  opts: { gap: 10, marginBottom: 16 },
  opt: {
    borderWidth: 1.5,
    borderColor: Colors.line,
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 44,
  },
  optOk: {
    borderColor: Colors.ok,
    backgroundColor: Colors.ok + '1F',
  },
  optBad: {
    borderColor: Colors.err,
    backgroundColor: Colors.err + '1F',
  },
  optText: {
    fontFamily: Fonts.semiBold,
    fontSize: 14,
    color: Colors.ink,
  },

  /* feedback */
  feedback: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  feedbackVerdict: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    lineHeight: 20,
  },
  feedbackExp: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
    lineHeight: 20,
    flexShrink: 1,
  },

  /* botões */
  btnPrimaryFull: {
    height: 48,
    borderRadius: Radii.md,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  btnPrimaryText: {
    fontFamily: Fonts.bold,
    fontSize: 15,
    color: '#fff',
  },
  btnPrimary: {
    height: 44,
    paddingHorizontal: 20,
    borderRadius: Radii.md,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhost: {
    height: 44,
    paddingHorizontal: 16,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhostText: {
    fontFamily: Fonts.bold,
    fontSize: 13,
    color: Colors.muted,
  },

  /* resultado */
  finishedWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 40,
  },
  icoBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishedPts: {
    fontFamily: Fonts.extraBold,
    fontSize: 36,
    color: Colors.ok,
    letterSpacing: -0.7,
  },
  finishedMsg: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.muted,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  finishedActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
});
