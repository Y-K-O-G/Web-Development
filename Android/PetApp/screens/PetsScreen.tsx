import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert, Linking, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PetsScreen() {
  const [modalVisible, setModalVisible] = useState(false); // Modal de cadastro/edição de pet
  const [viewingPetModalVisible, setViewingPetModalVisible] = useState(false); // Modal de visualização de informações
  const [petName, setPetName] = useState('');
  const [breed, setBreed] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [clubinho, setClubinho] = useState('nao');
  const [shampooProprio, setShampooProprio] = useState('nao');
  const [perfume, setPerfume] = useState('nao');

  const [pets, setPets] = useState([]);
  const [selectedPetIndex, setSelectedPetIndex] = useState(null);
  const [viewingPet, setViewingPet] = useState(null);

  const [errors, setErrors] = useState({
    petName: false,
    breed: false,
    ownerName: false,
    phone: false,
    address: false,
  });

  useEffect(() => {
    const loadPets = async () => {
      try {
        const storedPets = await AsyncStorage.getItem('pets');
        if (storedPets) {
          const parsedPets = JSON.parse(storedPets);
          setPets(parsedPets.sort((a, b) => a.petName.localeCompare(b.petName)));
        }
      } catch (error) {
        console.error('Erro ao carregar os pets: ', error);
      }
    };

    loadPets();
  }, []);

  const savePetsToStorage = async (petsList) => {
    try {
      await AsyncStorage.setItem('pets', JSON.stringify(petsList));
    } catch (error) {
      console.error('Erro ao salvar os pets: ', error);
    }
  };

  const resetFields = () => {
    setPetName('');
    setBreed('');
    setOwnerName('');
    setPhone('');
    setAddress('');
    setClubinho('nao');
    setShampooProprio('nao');
    setPerfume('nao');
    setErrors({
      petName: false,
      breed: false,
      ownerName: false,
      phone: false,
      address: false,
    });
  };

  const handleSave = async () => {
    const newErrors = {
      petName: !petName,
      breed: !breed,
      ownerName: !ownerName,
      phone: !phone,
      address: !address,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) return;

    const duplicatePet = pets.some((pet, index) =>
      pet.petName === petName && pet.phone === phone && index !== selectedPetIndex
    );

    if (duplicatePet) {
      Alert.alert('Erro', 'Pet já cadastrado!');
      return;
    }

    const newPet = { petName, breed, ownerName, phone, address, clubinho, shampooProprio, perfume };
    let updatedPets;

    if (selectedPetIndex !== null) {
      updatedPets = [...pets];
      updatedPets[selectedPetIndex] = newPet;
    } else {
      updatedPets = [...pets, newPet];
    }

    updatedPets.sort((a, b) => a.petName.localeCompare(b.petName));
    setPets(updatedPets);
    savePetsToStorage(updatedPets);
    setModalVisible(false);
    resetFields();
    setSelectedPetIndex(null); // Reset selectedPetIndex after saving
  };

  const handleEdit = (index) => {
    const pet = pets[index];
    setPetName(pet.petName);
    setBreed(pet.breed);
    setOwnerName(pet.ownerName);
    setPhone(pet.phone);
    setAddress(pet.address);
    setClubinho(pet.clubinho);
    setShampooProprio(pet.shampooProprio);
    setPerfume(pet.perfume);
    setSelectedPetIndex(index); // Track selected pet index for editing
    setViewingPetModalVisible(false); // Close the viewing modal when editing
    setModalVisible(true); // Open the edit modal
  };

  const handleDelete = async () => {
    if (selectedPetIndex === null) return;

    Alert.alert('Excluir Pet', 'Você tem certeza que deseja excluir este pet?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Excluir',
        onPress: async () => {
          const updatedPets = pets.filter((_, i) => i !== selectedPetIndex);
          setPets(updatedPets);
          savePetsToStorage(updatedPets);
          setViewingPet(null); // Reset viewing pet after deletion
          setSelectedPetIndex(null); // Reset selectedPetIndex after deletion
          setViewingPetModalVisible(false); // Close the pet info modal after deletion
        },
      },
    ]);
  };

  const handleCloseModal = () => {
    resetFields();
    setModalVisible(false);
    setSelectedPetIndex(null); // Reset index when closing modal
    setViewingPetModalVisible(false); // Close the viewing modal
  };

  const handlePhoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
      console.error('Erro ao tentar fazer a ligação:', err)
    );
  };

  const handleViewPet = (index) => {
    setSelectedPetIndex(index);
    setViewingPet(pets[index]);
    setViewingPetModalVisible(true); // Show the pet's details modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>Cadastrar Pet</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Cadastro / Edição */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cadastrar Pet</Text>

            <Text style={styles.inputLabel}>Nome do Pet</Text>
            <TextInput
              style={[styles.input, errors.petName && styles.inputError]}
              value={petName}
              onChangeText={setPetName}
            />

            <Text style={styles.inputLabel}>Raça</Text>
            <TextInput
              style={[styles.input, errors.breed && styles.inputError]}
              value={breed}
              onChangeText={setBreed}
            />

            <Text style={styles.inputLabel}>Nome do Tutor</Text>
            <TextInput
              style={[styles.input, errors.ownerName && styles.inputError]}
              value={ownerName}
              onChangeText={setOwnerName}
            />

            <Text style={styles.inputLabel}>Telefone</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={phone}
              keyboardType="numeric"
              onChangeText={setPhone}
            />

            <Text style={styles.inputLabel}>Endereço</Text>
            <TextInput
              style={[styles.input, errors.address && styles.inputError]}
              value={address}
              onChangeText={setAddress}
            />

            <Text style={styles.inputLabel}>Clubinho</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setClubinho('sim')} style={styles.radioButtonContainer}>
                <View style={[styles.radioButton, clubinho === 'sim' && styles.radioButtonSelected]} />
                <Text style={styles.radioText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setClubinho('nao')} style={styles.radioButtonContainer}>
                <View style={[styles.radioButton, clubinho === 'nao' && styles.radioButtonSelected]} />
                <Text style={styles.radioText}>Não</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Shampoo próprio</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setShampooProprio('sim')} style={styles.radioButtonContainer}>
                <View style={[styles.radioButton, shampooProprio === 'sim' && styles.radioButtonSelected]} />
                <Text style={styles.radioText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShampooProprio('nao')} style={styles.radioButtonContainer}>
                <View style={[styles.radioButton, shampooProprio === 'nao' && styles.radioButtonSelected]} />
                <Text style={styles.radioText}>Não</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Perfume</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setPerfume('sim')} style={styles.radioButtonContainer}>
                <View style={[styles.radioButton, perfume === 'sim' && styles.radioButtonSelected]} />
                <Text style={styles.radioText}>Sim</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPerfume('nao')} style={styles.radioButtonContainer}>
                <View style={[styles.radioButton, perfume === 'nao' && styles.radioButtonSelected]} />
                <Text style={styles.radioText}>Não</Text>
              </TouchableOpacity>
            </View>

            <Button title={selectedPetIndex !== null ? 'Atualizar' : 'Cadastrar'} onPress={handleSave} />
            <Button title="Cancelar" onPress={handleCloseModal} color="gray" />
          </View>
        </View>
      </Modal>

      {/* Lista de Pets */}
      <ScrollView contentContainerStyle={styles.petList}>
        {pets.map((pet, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleViewPet(index)}
            style={styles.petCard}
          >
            <Text style={styles.petListItem}>
              {pet.petName} - <Text style={styles.petListSubItem}>{pet.ownerName}</Text>
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal de Visualização do Pet */}
      {viewingPet && viewingPetModalVisible && (
        <Modal visible={true} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Perfil do Pet</Text>
              <Text style={styles.infoText}>Nome: {viewingPet.petName}</Text>
              <Text style={styles.infoText}>Raça: {viewingPet.breed}</Text>
              <Text style={styles.infoText}>Tutor: {viewingPet.ownerName}</Text>
              <TouchableOpacity onPress={() => handlePhoneCall(viewingPet.phone)}>
                <Text style={styles.infoText}>Telefone: {viewingPet.phone}</Text>
              </TouchableOpacity>
              <Text style={styles.infoText}>Endereço: {viewingPet.address}</Text>
              <Text style={styles.infoText}>Clubinho: {viewingPet.clubinho === 'sim' ? 'Sim' : 'Não'}</Text>
              <Text style={styles.infoText}>Shampoo Próprio: {viewingPet.shampooProprio === 'sim' ? 'Sim' : 'Não'}</Text>
              <Text style={styles.infoText}>Perfume: {viewingPet.perfume === 'sim' ? 'Sim' : 'Não'}</Text>

              <Button title="Editar" onPress={() => handleEdit(selectedPetIndex)} />
              <Button title="Excluir" onPress={handleDelete} color="red" />
              <Button title="Fechar" onPress={() => setViewingPetModalVisible(false)} color="gray" />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 6, // Ajustando o padding
    borderRadius: 12, // Tornando mais arredondado
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    marginLeft: 10, // Distância da borda direita
    alignSelf: 'flex-start', // Deixe o botão mais alinhado com o texto
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    marginTop: -2, // Ajustando a posição do sinal "+"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2196F3',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#2196F3',
  },
  radioText: {
    fontSize: 16,
  },
  petList: {
    paddingBottom: 20,
  },
  petCard: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  petListItem: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  petListSubItem: {
    fontSize: 18,
    color: 'gray',
  },
});
