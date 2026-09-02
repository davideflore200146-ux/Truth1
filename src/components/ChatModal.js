import React, { useState } from 'react';
import {
Modal,
View,
Text,
TextInput,
TouchableOpacity,
ScrollView,
StyleSheet,
ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { COLORS } from '../theme';
import { sendChatMessage } from '../api';

export default function ChatModal({ analysisId, onClose }) {
const { t } = useTranslation();

const [messages, setMessages] = useState([
{
from: 'bot',
text: t('chat.initialMessage'),
},
]);

const [input, setInput] = useState('');
const [sending, setSending] = useState(false);

const suggestions = [
t('chat.suggestion1'),
t('chat.suggestion2'),
t('chat.suggestion3'),
];

const send = async (text) => {
if (!text.trim() || sending) return;

```
setMessages((m) => [...m, { from: 'user', text }]);
setInput('');
setSending(true);

try {
  const { answer } = await sendChatMessage(analysisId, text);

  setMessages((m) => [
    ...m,
    { from: 'bot', text: answer },
  ]);
} catch (err) {
  setMessages((m) => [
    ...m,
    {
      from: 'bot',
      text: t('chat.error', {
        message: err?.message || t('common.tryAgain'),
      }),
    },
  ]);
} finally {
  setSending(false);
}
```

};

return ( <Modal
   transparent
   animationType="slide"
   onRequestClose={onClose}
 > <View style={styles.backdrop}> <View style={styles.sheet}> <View style={styles.header}>
<View
style={{
flexDirection: 'row',
alignItems: 'center',
gap: 6,
}}
> <Feather
             name="zap"
             size={14}
             color={COLORS.brand}
           />

```
          <Text style={styles.headerTitle}>
            {t('chat.title')}
          </Text>
        </View>

        <TouchableOpacity onPress={onClose}>
          <Feather
            name="x"
            size={18}
            color={COLORS.textMuted}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.messages}
        contentContainerStyle={{ gap: 10 }}
      >
        {messages.map((m, i) => (
          <View
            key={i}
            style={[
              styles.bubble,
              m.from === 'user'
                ? styles.bubbleUser
                : styles.bubbleBot,
            ]}
          >
            <Text
              style={{
                color:
                  m.from === 'user'
                    ? COLORS.bg
                    : COLORS.textPrimary,
                fontSize: 12.5,
                lineHeight: 17,
              }}
            >
              {m.text}
            </Text>
          </View>
        ))}

        {sending && (
          <View
            style={[
              styles.bubble,
              styles.bubbleBot,
            ]}
          >
            <ActivityIndicator
              size="small"
              color={COLORS.brand}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.presets}>
        {suggestions.map((q) => (
          <TouchableOpacity
            key={q}
            onPress={() => send(q)}
            style={styles.presetBtn}
          >
            <Text style={styles.presetText}>
              {q}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => send(input)}
          placeholder={t('chat.placeholder')}
          placeholderTextColor={COLORS.textMuted}
          style={styles.input}
          editable={!sending}
        />

        <TouchableOpacity
          onPress={() => send(input)}
          style={styles.sendBtn}
          disabled={sending}
        >
          <Feather
            name="send"
            size={15}
            color={COLORS.bg}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
```

);
}

const styles = StyleSheet.create({
backdrop: {
flex: 1,
backgroundColor: 'rgba(6,7,9,0.7)',
justifyContent: 'flex-end',
},

sheet: {
backgroundColor: COLORS.surface,
borderTopLeftRadius: 20,
borderTopRightRadius: 20,
borderWidth: 1,
borderColor: COLORS.border,
maxHeight: '78%',
},

header: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
padding: 16,
borderBottomWidth: 1,
borderBottomColor: COLORS.border,
},

headerTitle: {
fontWeight: '700',
fontSize: 13.5,
color: COLORS.textPrimary,
},

messages: {
padding: 14,
maxHeight: 260,
},

bubble: {
padding: 10,
borderRadius: 13,
maxWidth: '82%',
},

bubbleUser: {
backgroundColor: COLORS.brand,
alignSelf: 'flex-end',
},

bubbleBot: {
backgroundColor: COLORS.surfaceRaised,
alignSelf: 'flex-start',
},

presets: {
flexDirection: 'row',
flexWrap: 'wrap',
gap: 6,
paddingHorizontal: 12,
paddingTop: 4,
},

presetBtn: {
borderWidth: 1,
borderColor: COLORS.border,
borderRadius: 999,
paddingHorizontal: 10,
paddingVertical: 6,
},

presetText: {
fontSize: 11,
color: COLORS.textSecondary,
},

inputRow: {
flexDirection: 'row',
gap: 8,
padding: 12,
},

input: {
flex: 1,
backgroundColor: COLORS.surfaceRaised,
borderWidth: 1,
borderColor: COLORS.border,
borderRadius: 12,
paddingHorizontal: 12,
paddingVertical: 10,
color: COLORS.textPrimary,
fontSize: 12.5,
},

sendBtn: {
backgroundColor: COLORS.brand,
borderRadius: 12,
width: 40,
alignItems: 'center',
justifyContent: 'center',
},
});
