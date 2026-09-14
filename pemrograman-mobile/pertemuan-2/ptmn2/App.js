import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>

          <Text style={styles.name}>[Abdullah Fattah]</Text>
          <Text style={styles.role}>Mahasiswa Informatika</Text>

          <View style={styles.line} />
          
          <Text style={styles.intro}>
            Personal Curriculum Vitae
          </Text>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>

          {/* INFORMASI PRIBADI */}
          <Text style={styles.sectionTitle}>
            INFORMASI PRIBADI
          </Text>

          <View style={styles.card}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>NIM</Text>
              <Text style={styles.value}>2488010067</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <Text style={styles.label}>ASAL SEKOLAH</Text>
              <Text style={styles.value}>SMK Negeri 1 Cirebon</Text>
            </View>
          </View>

          {/* CITA-CITA */}
          <Text style={styles.sectionTitle}>
            CITA-CITA
          </Text>

          <View style={styles.goalCard}>
            <Text style={styles.goalIcon}>🎯</Text>

            <View style={styles.goalContent}>
              <Text style={styles.goalTitle}>Cita-cita Saya</Text>

              <Text style={styles.goalText}>
                Menjadi Seorang AI Engineer dan Automation
              </Text>
            </View>
          </View>

          {/* RENCANA */}
          <Text style={styles.sectionTitle}>
            RENCANA MENCAPAI CITA-CITA
          </Text>

          <View style={styles.planCard}>

            <View style={styles.planItem}>
              <View style={styles.number}>
                <Text style={styles.numberText}>1</Text>
              </View>

              <Text style={styles.planText}>
                Memperbanyak Portfolio dan Proyek AI
              </Text>
            </View>

            <View style={styles.planItem}>
              <View style={styles.number}>
                <Text style={styles.numberText}>2</Text>
              </View>

              <Text style={styles.planText}>
                Memperbanyak Relasi dan push my limit
              </Text>
            </View>

          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              "Keep learning, keep growing."
            </Text>

            <Text style={styles.footerName}>
              [Nama Lengkap]
            </Text>
          </View>

        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    backgroundColor: '#1E3A5F',
    paddingTop: 60,
    paddingBottom: 35,
    paddingHorizontal: 25,
    alignItems: 'center',

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,

    backgroundColor: '#FFFFFF',

    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 15,
  },

  avatarText: {
    fontSize: 42,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  role: {
    color: '#D6E4F0',
    fontSize: 15,
    marginTop: 5,
  },

  line: {
    width: 45,
    height: 3,
    backgroundColor: '#FFFFFF',

    marginVertical: 15,

    borderRadius: 10,
  },

  intro: {
    color: '#D6E4F0',
    fontSize: 13,
  },

  /* =========================
     CONTENT
  ========================= */

  content: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',

    color: '#1E3A5F',

    marginBottom: 12,
    marginTop: 5,

    letterSpacing: 1,
  },

  /* =========================
     INFORMATION CARD
  ========================= */

  card: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    paddingHorizontal: 18,
    paddingVertical: 5,

    marginBottom: 25,

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  infoItem: {
    paddingVertical: 15,
  },

  label: {
    fontSize: 11,
    fontWeight: 'bold',

    color: '#8A96A3',

    marginBottom: 5,

    letterSpacing: 0.8,
  },

  value: {
    fontSize: 16,
    fontWeight: '600',

    color: '#263238',
  },

  divider: {
    height: 1,
    backgroundColor: '#E8ECEF',
  },

  /* =========================
     GOAL CARD
  ========================= */

  goalCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    padding: 20,

    marginBottom: 25,

    flexDirection: 'row',
    alignItems: 'center',

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  goalIcon: {
    fontSize: 35,

    marginRight: 15,
  },

  goalContent: {
    flex: 1,
  },

  goalTitle: {
    fontSize: 12,
    color: '#8A96A3',

    marginBottom: 5,
  },

  goalText: {
    fontSize: 18,
    fontWeight: 'bold',

    color: '#1E3A5F',
  },

  /* =========================
     PLAN CARD
  ========================= */

  planCard: {
    backgroundColor: '#FFFFFF',

    borderRadius: 16,

    padding: 20,

    marginBottom: 25,

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  planItem: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    marginBottom: 18,
  },

  number: {
    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: '#1E3A5F',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  numberText: {
    color: '#FFFFFF',

    fontWeight: 'bold',
    fontSize: 14,
  },

  planText: {
    flex: 1,

    color: '#4F5B66',

    fontSize: 14,

    lineHeight: 21,

    paddingTop: 4,
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    alignItems: 'center',

    paddingVertical: 20,
  },

  footerText: {
    color: '#8A96A3',

    fontSize: 13,

    fontStyle: 'italic',

    marginBottom: 6,
  },

  footerName: {
    color: '#1E3A5F',

    fontSize: 14,

    fontWeight: 'bold',
  },
});
