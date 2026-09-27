// ============================================================
// IMPORT LIBRARY
// ============================================================
import React, { useState, useEffect, useRef } from 'react';

// ============================================================
// IMPORT COMPONENT
// ============================================================
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';

// ============================================================
// PROFILE DATA
// ============================================================
const PROFILE = {
  name: 'Abdullah Fattah',
  title: 'Mahasiswa Informatika',
  email: 'abdullahfattah@gmail.com',
  phone: '083176893435',
  location: 'Cirebon, Jawa Barat',
  bio: 'Mahasiswa IT yang ingin menjadi CEO',

  // FOTO DARI URL
  avatar: 'https://github.com/fattah-abdullah.png',
};

// ============================================================
// SKILL DATA
// ============================================================
const SKILL = [
  {
    id: '1',
    name: 'Python',
    level: 90,
    color: '#F7DF1E',
  },
  {
    id: '2',
    name: 'PHP',
    level: 80,
    color: '#787CB5',
  },
  {
    id: '3',
    name: 'JavaScript',
    level: 60,
    color: '#FFCA28',
  },
  {
    id: '4',
    name: 'Java',
    level: 80,
    color: '#E42625',
  },
  {
    id: '5',
    name: 'MySQL',
    level: 90,
    color: '#F29111',
  },
  {
    id: '6',
    name: 'C++',
    level: 80,
    color: '#004482',
  },

  // TAMBAHAN SKILL
  {
    id: '7',
    name: 'React Native',
    level: 75,
    color: '#61DAFB',
  },
  {
    id: '8',
    name: 'Git & GitHub',
    level: 85,
    color: '#F05032',
  },
  {
    id: '9',
    name: 'Machine Learning',
    level: 75,
    color: '#10B981',
  },
];

// ============================================================
// EXPERIENCE & EDUCATION DATA
// ============================================================
const SECTIONS = [
  {
    title: '💼 Pengalaman Kerja',

    data: [
      {
        id: 'e1',
        role: 'Siswa PKL',
        company: 'PT. Orbit Indonesia Persada',
        period: 'Juli - September 2023',
        desc:
          'Mengelola Aplikasi Sidesi dan Membuat Sistem Informasi Manajemen PKL untuk Laporan PKL.',
      },

      // GANTI DENGAN DATA ORGANISASI ASLI KAMU
      {
        id: 'e2',
        role: 'Divisi Acara',
        company: 'Fortation 2026',
        period: 'Tahun 2026',
        desc:
          'Membuat Rounddown dan mengatur acara agar berjalan sesuai rounddown.',
      },
    ],
  },

  {
    title: '🎓 Pendidikan',

    data: [
      {
        id: 'd1',
        role: 'S1 Informatika',
        company:
          'Universitas Islam Negeri Siber Syekh Nurjati Cirebon',
        period: '2024 - 2028',
        desc:
          'IPK 3.66 / 4.00 · Skripsi: Implementasi Human Detection pada aplikasi ketersediaan kelas berbasis Mobile.',
      }
    ],
  },
];

// ============================================================
// SOCIAL MEDIA DATA
// ============================================================
const SOCIAL = [
  {
    id: 's1',
    label: 'Github',
    icon: '👨‍💻',
    url: 'https://github.com/fattah-abdullah',
  },
  {
    id: 's2',
    label: 'LinkedIn',
    icon: '💼',
    url: 'https://www.linkedin.com/in/abdullah-fattah-f979s24/',
  },
];

// ============================================================
// SKILL CARD
// ============================================================
const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>

    {/* Nama skill dan persentase */}
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>
        {item.name}
      </Text>

      <Text style={styles.skillPercent}>
        {item.level}%
      </Text>
    </View>

    {/* Background progress bar */}
    <View style={styles.progressBg}>

      {/* Progress bar dinamis */}
      <View
        style={[
          styles.progressFill,
          {
            width: `${item.level}%`,
            backgroundColor: item.color,
          },
        ]}
      />

    </View>
  </View>
);

// ============================================================
// TIMELINE CARD
// ============================================================
const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}
  >

    {/* Titik timeline */}
    <View style={styles.timelineDot} />

    {/* Isi timeline */}
    <View style={styles.timelineContent}>

      <Text style={styles.timelineRole}>
        {item.role}
      </Text>

      <Text style={styles.timelineCompany}>
        {item.company}
      </Text>

      <Text style={styles.timelinePeriod}>
        {item.period}
      </Text>

      <Text style={styles.timelineHint}>
        Ketuk untuk detail →
      </Text>

    </View>
  </TouchableOpacity>
);

// ============================================================
// MAIN APP
// ============================================================
export default function App() {

  // ==========================================================
  // STATE
  // ==========================================================

  // Toggle Open to Work
  const [openToWork, setOpenToWork] = useState(true);

  // Modal
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Form
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');

  // Loading kirim pesan
  const [sending, setSending] = useState(false);

  // Status tombol Download
  const [pressing, setPressing] = useState(false);

  // ==========================================================
  // TAB NAVIGASI
  // ==========================================================
  const [activeTab, setActiveTab] = useState('Info');

  // ==========================================================
  // ANIMASI AVATAR
  // ==========================================================
  const avatarScale = useRef(
    new Animated.Value(0.85)
  ).current;

  useEffect(() => {
    Animated.spring(avatarScale, {
      toValue: 1,
      friction: 5,
      tension: 45,
      useNativeDriver: true,
    }).start();
  }, [avatarScale]);

  // ==========================================================
  // HANDLER - TIMELINE CARD
  // ==========================================================
  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // ==========================================================
  // HANDLER - KIRIM PESAN
  // ==========================================================
  const handleSend = () => {

    // Validasi input kosong
    if (!senderName.trim() || !message.trim()) {

      Alert.alert(
        '⚠️ Peringatan',
        'Nama dan pesan tidak boleh kosong!'
      );

      return;
    }

    // Aktifkan loading
    setSending(true);

    // Simulasi proses pengiriman selama 2 detik
    setTimeout(() => {

      setSending(false);

      // Simpan nama sebelum state dikosongkan
      const sentName = senderName;

      setSenderName('');
      setMessage('');

      Alert.alert(
        '✅ Berhasil',
        `Pesan dari ${sentName} telah terkirim!`
      );

    }, 2000);
  };

  // ==========================================================
  // HANDLER - SOCIAL MEDIA
  // ==========================================================
  const handleSocialPress = (url) => {

    Alert.alert(
      '🔗 Link',
      url
    );
  };

  // ==========================================================
  // HANDLER - DOWNLOAD CV
  // ==========================================================
  const handleDownloadCV = () => {

    Alert.alert(
      '⬇️ Download CV',
      'CV sedang diunduh...'
    );
  };

  // ==========================================================
  // RETURN
  // ==========================================================
  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ======================================================
          STATUS BAR
      ======================================================= */}
      <StatusBar
        backgroundColor="#1a1a2e"
        barStyle="light-content"
      />

      {/* ======================================================
          HEADER
      ======================================================= */}
      <View style={styles.headerBar}>

        <Text style={styles.headerTitle}>
          📄 Curriculum Vitae
        </Text>

        {/* Toggle Open to Work */}
        <View style={styles.switchRow}>

          <Text style={styles.switchLabel}>
            {openToWork
              ? '🟢 Open'
              : '🔴 Busy'}
          </Text>

          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{
              false: '#555',
              true: '#4ade80',
            }}
            thumbColor={
              openToWork
                ? '#fff'
                : '#aaa'
            }
          />

        </View>
      </View>

      {/* ======================================================
          TAB NAVIGASI
      ======================================================= */}
      <View style={styles.tabBar}>

        {['Info', 'Skills', 'Kontak'].map((tab) => (

          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab &&
                styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.8}
          >

            <Text
              style={[
                styles.tabText,
                activeTab === tab &&
                  styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* ======================================================
          MAIN SCROLL
      ======================================================= */}
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >

        {/* ====================================================
            PROFILE SECTION
            TAB: INFO
        ===================================================== */}
        {activeTab === 'Info' && (

          <View style={styles.profileSection}>

            {/* FOTO DARI URL */}
            <Animated.Image
              source={{
                uri: PROFILE.avatar,
              }}
              style={[
                styles.avatar,
                {
                  transform: [
                    {
                      scale: avatarScale,
                    },
                  ],
                },
              ]}
              resizeMode="cover"
            />

            {/* Badge Open to Work */}
            {openToWork && (
              <View style={styles.badge}>

                <Text style={styles.badgeText}>
                  ✅ Open to Work
                </Text>

              </View>
            )}

            {/* Nama */}
            <Text style={styles.profileName}>
              {PROFILE.name}
            </Text>

            {/* Jabatan */}
            <Text style={styles.profileTitle}>
              {PROFILE.title}
            </Text>

            {/* Bio */}
            <Text style={styles.profileBio}>
              {PROFILE.bio}
            </Text>

            {/* Kontak */}
            <View style={styles.contactRow}>

              <Text style={styles.contactItem}>
                📧 {PROFILE.email}
              </Text>

              <Text style={styles.contactItem}>
                📍 {PROFILE.location}
              </Text>

            </View>

            <Text style={styles.contactItem}>
              📱 {PROFILE.phone}
            </Text>

            {/* ==================================================
                SOCIAL MEDIA BUTTON
            =================================================== */}
            <View style={styles.socialRow}>

              {SOCIAL.map((s) => (

                <TouchableOpacity
                  key={s.id}
                  style={styles.socialBtn}
                  onPress={() =>
                    handleSocialPress(s.url)
                  }
                  activeOpacity={0.8}
                >

                  <Text style={styles.socialIcon}>
                    {s.icon}
                  </Text>

                  <Text style={styles.socialLabel}>
                    {s.label}
                  </Text>

                </TouchableOpacity>

              ))}

            </View>

            {/* ==================================================
                DOWNLOAD CV
            =================================================== */}
            <Pressable
              style={({ pressed }) => [
                styles.downloadBtn,
                pressed &&
                  styles.downloadBtnPressed,
              ]}
              onPressIn={() =>
                setPressing(true)
              }
              onPressOut={() =>
                setPressing(false)
              }
              onPress={handleDownloadCV}
            >

              <Text style={styles.downloadBtnText}>

                {pressing
                  ? '⏳ Mengunduh...'
                  : '⬇️ Download CV (PDF)'}

              </Text>

            </Pressable>

          </View>

        )}

        {/* Spacer */}
        {activeTab === 'Info' && (
          <View style={{ height: 40 }} />
        )}

        {/* ====================================================
            SKILL SECTION
            TAB: SKILLS
        ===================================================== */}
        {activeTab === 'Skills' && (

          <View style={styles.sectionBox}>

            <Text style={styles.sectionTitle}>
              🛠️ Keahlian
            </Text>

            <Text style={styles.sectionSubtitle}>
              ↳ FlatList: menampilkan list data secara efisien
            </Text>

            <FlatList
              data={SKILL}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <SkillCard item={item} />
              )}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={{ height: 8 }} />
              )}
            />

          </View>

        )}

        {/* ====================================================
            RIWAYAT SECTION
            TAB: INFO
        ===================================================== */}
        {activeTab === 'Info' && (

          <View style={styles.sectionBox}>

            <Text style={styles.sectionTitle}>
              📋 Riwayat
            </Text>

            <Text style={styles.sectionSubtitle}>
              ↳ SectionList: data dikelompokkan per kategori.
              Ketuk kartu untuk Modal detail.
            </Text>

            <SectionList
              sections={SECTIONS}
              keyExtractor={(item) => item.id}

              renderItem={({ item }) => (
                <TimelineCard
                  item={item}
                  onPress={handleCardPress}
                />
              )}

              renderSectionHeader={({
                section: { title },
              }) => (

                <View style={styles.sectionHeader}>

                  <Text style={styles.sectionHeaderText}>
                    {title}
                  </Text>

                </View>

              )}

              scrollEnabled={false}

              ItemSeparatorComponent={() => (
                <View style={{ height: 10 }} />
              )}

              SectionSeparatorComponent={() => (
                <View style={{ height: 16 }} />
              )}
            />

          </View>

        )}

        {/* ====================================================
            CONTACT SECTION
            TAB: KONTAK
        ===================================================== */}
        {activeTab === 'Kontak' && (

          <KeyboardAvoidingView
            behavior={
              Platform.OS === 'ios'
                ? 'padding'
                : 'height'
            }
            keyboardVerticalOffset={
              Platform.OS === 'ios'
                ? 90
                : 20
            }
          >

            <View style={styles.sectionBox}>

              <Text style={styles.sectionTitle}>
                ✉️ Hubungi Saya
              </Text>

              <Text style={styles.sectionSubtitle}>
                ↳ TextInput, Button, ActivityIndicator
              </Text>

              {/* Input Nama */}
              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#888"
                value={senderName}
                onChangeText={setSenderName}
                returnKeyType="next"
                editable={!sending}
              />

              {/* Input Pesan */}
              <TextInput
                style={[
                  styles.textInput,
                  styles.textArea,
                ]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!sending}
              />

              {/* ==================================================
                  LOADING ATAU BUTTON
              =================================================== */}
              {sending ? (

                <View style={styles.loadingRow}>

                  <ActivityIndicator
                    size="large"
                    color="#7c3aed"
                  />

                  <Text style={styles.loadingText}>
                    Mengirim pesan...
                  </Text>

                </View>

              ) : (

                <Button
                  title="📨 Kirim Pesan"
                  color="#7c3aed"
                  onPress={handleSend}
                />

              )}

            </View>

          </KeyboardAvoidingView>

        )}

      </ScrollView>

      {/* ======================================================
          MODAL DETAIL
      ======================================================= */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() =>
          setModalVisible(false)
        }
      >

        {/* Overlay */}
        <View style={styles.modalOverlay}>

          {/* Kotak Modal */}
          <View style={styles.modalBox}>

            {selectedItem && (
              <>

                <Text style={styles.modalTitle}>
                  {selectedItem.role}
                </Text>

                <Text style={styles.modalCompany}>
                  {selectedItem.company}
                </Text>

                <Text style={styles.modalPeriod}>
                  📅 {selectedItem.period}
                </Text>

                <View style={styles.modalDivider} />

                <Text style={styles.modalDesc}>
                  {selectedItem.desc}
                </Text>

              </>
            )}

            {/* Tombol Tutup */}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() =>
                setModalVisible(false)
              }
              activeOpacity={0.8}
            >

              <Text style={styles.modalCloseBtnText}>
                ✕ Tutup
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}

// ============================================================
// COLORS
// ============================================================
const COLORS = {
  bg: '#0f0f1a',
  card: '#1a1a2e',
  cardBorder: '#2d2d44',

  accent: '#7c3aed',
  accentLight: '#a78bfa',
  accentGold: '#f59e0b',

  text: '#f0f0f0',
  textMuted: '#9ca3af',
  textDim: '#6b7280',

  success: '#4ade80',
  white: '#ffffff',
};

// ============================================================
// STYLES
// ============================================================
const styles = StyleSheet.create({

  // ==========================================================
  // LAYOUT
  // ==========================================================
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  scroll: {
    flex: 1,
  },

  // ==========================================================
  // HEADER
  // ==========================================================
  headerBar: {
    backgroundColor: '#1a1a2e',

    paddingHorizontal: 20,
    paddingVertical: 14,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,

    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // ==========================================================
  // TAB NAVIGATION
  // ==========================================================
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    borderRadius: 10,
  },

  tabButtonActive: {
    backgroundColor: '#312e81',
  },

  tabText: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  tabTextActive: {
    color: COLORS.white,
    fontWeight: '800',
  },

  // ==========================================================
  // PROFILE
  // ==========================================================
  profileSection: {
    alignItems: 'center',

    paddingVertical: 32,
    paddingHorizontal: 20,

    backgroundColor: COLORS.card,

    marginBottom: 16,

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },

  // FOTO BULAT
  avatar: {
    width: 180,
    height: 180,

    borderRadius: 90,

    borderWidth: 3,
    borderColor: COLORS.accent,

    marginBottom: 12,

    backgroundColor: '#16213e',
  },

  // ==========================================================
  // OPEN TO WORK BADGE
  // ==========================================================
  badge: {
    backgroundColor: '#052e16',

    borderWidth: 1,
    borderColor: COLORS.success,

    paddingHorizontal: 12,
    paddingVertical: 4,

    borderRadius: 20,

    marginBottom: 12,
  },

  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },

  // ==========================================================
  // PROFILE TEXT
  // ==========================================================
  profileName: {
    color: COLORS.white,

    fontSize: 26,
    fontWeight: '800',

    textAlign: 'center',
  },

  profileTitle: {
    color: COLORS.accentLight,

    fontSize: 14,
    fontWeight: '600',

    marginTop: 4,
    marginBottom: 14,

    textAlign: 'center',
  },

  profileBio: {
    color: COLORS.textMuted,

    fontSize: 13,
    lineHeight: 20,

    textAlign: 'center',

    marginBottom: 16,

    paddingHorizontal: 8,
  },

  // ==========================================================
  // CONTACT
  // ==========================================================
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'center',

    gap: 8,

    marginBottom: 6,
  },

  contactItem: {
    color: COLORS.textMuted,

    fontSize: 12,

    textAlign: 'center',

    marginBottom: 4,
  },

  // ==========================================================
  // SOCIAL
  // ==========================================================
  socialRow: {
    flexDirection: 'row',

    gap: 12,

    marginTop: 16,
    marginBottom: 20,
  },

  socialBtn: {
    alignItems: 'center',

    backgroundColor: '#16213e',

    paddingVertical: 10,
    paddingHorizontal: 16,

    borderRadius: 12,

    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  socialIcon: {
    fontSize: 20,
    marginBottom: 4,
  },

  socialLabel: {
    color: COLORS.accentLight,

    fontSize: 11,
    fontWeight: '600',
  },

  // ==========================================================
  // DOWNLOAD BUTTON
  // ==========================================================
  downloadBtn: {
    backgroundColor: COLORS.accent,

    paddingVertical: 14,
    paddingHorizontal: 36,

    borderRadius: 50,

    elevation: 4,

    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowRadius: 8,
  },

  downloadBtnPressed: {
    backgroundColor: '#5b21b6',

    transform: [
      {
        scale: 0.97,
      },
    ],
  },

  downloadBtnText: {
    color: COLORS.white,

    fontWeight: '700',

    fontSize: 14,
  },

  // ==========================================================
  // SECTION BOX
  // ==========================================================
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,

    backgroundColor: COLORS.card,

    borderRadius: 16,

    padding: 18,

    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  sectionTitle: {
    color: COLORS.white,

    fontSize: 17,
    fontWeight: '700',

    marginBottom: 4,
  },

  sectionSubtitle: {
    color: COLORS.textDim,

    fontSize: 11,
    fontStyle: 'italic',

    marginBottom: 16,
  },

  // ==========================================================
  // SECTION HEADER
  // ==========================================================
  sectionHeader: {
    backgroundColor: '#0f172a',

    paddingVertical: 8,
    paddingHorizontal: 12,

    borderRadius: 8,

    marginBottom: 8,

    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },

  sectionHeaderText: {
    color: COLORS.accentLight,

    fontWeight: '700',

    fontSize: 13,
  },

  // ==========================================================
  // SKILL
  // ==========================================================
  skillCard: {
    backgroundColor: '#16213e',

    padding: 12,

    borderRadius: 10,

    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  skillHeader: {
    flexDirection: 'row',

    justifyContent: 'space-between',

    marginBottom: 8,
  },

  skillName: {
    color: COLORS.text,

    fontWeight: '600',

    fontSize: 13,
  },

  skillPercent: {
    color: COLORS.accentLight,

    fontWeight: '700',

    fontSize: 13,
  },

  // ==========================================================
  // PROGRESS BAR
  // ==========================================================
  progressBg: {
    height: 6,

    backgroundColor: '#0f172a',

    borderRadius: 4,

    overflow: 'hidden',
  },

  progressFill: {
    height: 6,

    borderRadius: 4,
  },

  // ==========================================================
  // TIMELINE
  // ==========================================================
  timelineCard: {
    flexDirection: 'row',

    backgroundColor: '#16213e',

    borderRadius: 12,

    padding: 14,

    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },

  timelineDot: {
    width: 10,
    height: 10,

    borderRadius: 5,

    backgroundColor: COLORS.accent,

    marginTop: 4,
    marginRight: 12,
  },

  timelineContent: {
    flex: 1,
  },

  timelineRole: {
    color: COLORS.white,

    fontWeight: '700',

    fontSize: 14,

    marginBottom: 2,
  },

  timelineCompany: {
    color: COLORS.accentLight,

    fontSize: 13,

    marginBottom: 2,
  },

  timelinePeriod: {
    color: COLORS.textMuted,

    fontSize: 11,

    marginBottom: 6,
  },

  timelineHint: {
    color: COLORS.accentGold,

    fontSize: 11,

    fontStyle: 'italic',
  },

  // ==========================================================
  // TEXT INPUT
  // ==========================================================
  textInput: {
    backgroundColor: '#0f172a',

    color: COLORS.text,

    borderWidth: 1,
    borderColor: COLORS.cardBorder,

    borderRadius: 10,

    paddingHorizontal: 14,

    paddingVertical:
      Platform.OS === 'ios'
        ? 14
        : 10,

    fontSize: 14,

    marginBottom: 12,
  },

  textArea: {
    height: 100,

    textAlignVertical: 'top',
  },

  // ==========================================================
  // LOADING
  // ==========================================================
  loadingRow: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    gap: 12,

    paddingVertical: 10,
  },

  loadingText: {
    color: COLORS.accentLight,

    fontSize: 14,

    fontWeight: '600',
  },

  // ==========================================================
  // MODAL
  // ==========================================================
  modalOverlay: {
    flex: 1,

    backgroundColor:
      'rgba(0,0,0,0.75)',

    justifyContent: 'flex-end',
  },

  modalBox: {
    backgroundColor: '#1e1b4b',

    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,

    padding: 28,

    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },

  modalTitle: {
    color: COLORS.white,

    fontSize: 20,

    fontWeight: '800',

    marginBottom: 4,
  },

  modalCompany: {
    color: COLORS.accentLight,

    fontSize: 15,

    fontWeight: '600',

    marginBottom: 4,
  },

  modalPeriod: {
    color: COLORS.textMuted,

    fontSize: 13,

    marginBottom: 16,
  },

  modalDivider: {
    height: 1,

    backgroundColor: COLORS.cardBorder,

    marginBottom: 16,
  },

  modalDesc: {
    color: COLORS.text,

    fontSize: 14,

    lineHeight: 22,

    marginBottom: 24,
  },

  modalCloseBtn: {
    backgroundColor: COLORS.accent,

    borderRadius: 12,

    paddingVertical: 14,

    alignItems: 'center',
  },

  modalCloseBtnText: {
    color: COLORS.white,

    fontWeight: '700',

    fontSize: 14,
  },
});