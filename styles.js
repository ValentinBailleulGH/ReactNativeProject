
const styles = {
  flexCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  flexRowCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  settingsTitle: { fontSize: 18 },
  profileTextAnswer: { fontSize: 20, color: 'black' },
  profilePlaceholderText: { fontSize: 18, color: 'gray', fontStyle: 'italic' },
  profileForm: { display: 'flex', alignItems: 'center', paddingVertical: 32, gap: 32 },
  colors: {
    TextColor: '#0c030a',
    BackgroundColor: '#faebf7',
    PrimaryButton: '#db708f',
    SecondaryButton: '#f5ddd6',
    AccentColor: '#b84c2e',
    ActiveTab: '#edb7b7',
    ErrorText: '#ff0022'
  },
  icon: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
    borderRadius: 20
  }
}

export default styles
