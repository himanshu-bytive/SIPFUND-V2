import React, { useRef, useState, useEffect } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowDown from '../../../assets/Icons/arrow_down.svg';
import ArrowUp from '../../../assets/Icons/arrow_up.svg';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { DropdownStyles } from './DropDownStyles';

const Dropdown = ({
  data,
  placeholder,
  onChange,
  selectedValue,
  width = responsiveWidth(35),
  height = 45,
  borderRadius = 12,
}) => {
  const [selectedName, setSelectedName] = useState(selectedValue || placeholder);
  const [isClicked, setIsClicked] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const searchRef = useRef(null);

  useEffect(() => {
    setSelectedName(selectedValue || placeholder);
  }, [selectedValue, placeholder]);

  const onSearch = (txt) => {
    if (txt !== '') {
      const tempData = data.filter((item) =>
        item.name.toLowerCase().includes(txt.toLowerCase())
      );
      setFilteredData(tempData);
    } else {
      setFilteredData(data);
    }
  };

  const toggleDropdown = () => {
    if (!isClicked) {
      setFilteredData(data);
      searchRef.current?.clear();
    }
    setIsClicked(!isClicked);
  };

  return (
    <View style={DropdownStyles.container}>
      <TouchableOpacity
        style={[DropdownStyles.dropdownSelector, { width, height, borderRadius }]}
        onPress={toggleDropdown}
      >
        <Text style={{ color: '#000', marginRight: 5 }}>{selectedName}</Text>
        {isClicked ? (
          <ArrowUp width={15} height={15} />
        ) : (
          <ArrowDown width={15} height={15} />
        )}
      </TouchableOpacity>
      <Modal
        visible={isClicked}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleDropdown}
      >
        <TouchableOpacity
          style={DropdownStyles.modalOverlay}
          activeOpacity={1}
          onPressOut={toggleDropdown}
        >
          <View style={DropdownStyles.modalContent}>
            <TextInput
              ref={searchRef}
              placeholder="Search"
              placeholderTextColor={'rgba(53, 55, 60, 0.6)'}
              style={DropdownStyles.searchInput}
              onChangeText={(txt) => onSearch(txt)}
            />
            <FlatList
              data={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={DropdownStyles.item}
                  onPress={() => {
                    setSelectedName(item.name);
                    onSearch('');
                    setIsClicked(false);
                    searchRef.current?.clear();
                    onChange(item.code);
                  }}
                >
                  <Text style={{ color: '#000' }}>{item.name}</Text>
                </TouchableOpacity>
              )}
              style={DropdownStyles.list}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Dropdown;
