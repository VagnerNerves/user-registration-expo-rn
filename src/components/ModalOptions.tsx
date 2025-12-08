import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'

import { theme } from '@/src/theme/theme'

import { ButtonApp } from '@/src/components/ButtonApp'
import { TextApp } from '@/src/components/TextApp'

type ModalOptionsProps = Readonly<{
  title: string
  isVisible: boolean
  textButtonCancel: string
  textButtonOK: string
  onOK: () => void
  onCancel: () => void
}>
export function ModalOptions({
  title,
  isVisible,
  textButtonCancel,
  textButtonOK,
  onOK,
  onCancel
}: ModalOptionsProps) {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      statusBarTranslucent
    >
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onCancel}
          style={styles.buttonBackground}
        />
        <View style={styles.containerCard}>
          <TextApp style={styles.titleCard}>{title}</TextApp>

          <View style={styles.containerCardButtons}>
            <ButtonApp
              type="gray"
              text={textButtonCancel}
              buttonProps={{ style: { flex: 1 }, onPress: onCancel }}
            />

            <ButtonApp
              type="black"
              text={textButtonOK}
              buttonProps={{ style: { flex: 1 }, onPress: onOK }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBackground: {
    width: '100%',
    height: '100%',

    backgroundColor: 'rgba(0,0,0,0.7)',

    position: 'absolute'
  },
  containerCard: {
    paddingHorizontal: 24,
    paddingVertical: 32,

    marginHorizontal: 16,

    borderRadius: 12,

    gap: 32,

    backgroundColor: theme.COLORS.STONE[50]
  },
  titleCard: {
    fontFamily: theme.FONTS.ROBOTO_BOLD,
    fontSize: theme.FONTS.SIZE.LG,
    color: theme.COLORS.STONE[950],

    textAlign: 'center'
  },
  containerCardButtons: {
    width: '100%',
    flexDirection: 'row',
    gap: 12
  }
} as const)
