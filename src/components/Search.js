import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";
import axios from "axios";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const SuggestionInput = ({ navigate, fundDetails,setShowSearch ,showSearch }) => {
  const [inputText, setInputText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const inputRef = useRef(null);
  useEffect(() => {
    console.log("got",showSearch);
    
    if (showSearch) {
      inputRef.current?.focus(); // Automatically focus the input field
    }
  }, [showSearch]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputText.length >= 1) {
        try {
          const response = await axios.get(
            `https://sipfund.com/api/amc/search?amcname=${inputText}`
          );
          if (response?.data?.results && response?.data?.results?.length > 10) {
            setShowSuggestions(true);
            setSuggestions(response.data.results.slice(0, 10));
          } else {
            setShowSuggestions(false);
            // setSuggestions(response.data.results);
          }
        } catch (error) {
          setShowSuggestions(false);
          console.error(error);
        }
      } else {
        setShowSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [inputText]);

  const handleSuggestionSelect = (suggestion) => {
    fundDetails({
      name: suggestion.productName,
      productCode: suggestion.productCode,
      imagePath: `https://sipfund.sfo2.digitaloceanspaces.com/product-AMC-images/${suggestion.productAMCImage}`,
      isin: suggestion.productISIN,
    });
  navigate("Funds", {
  screen: "FundsDetails",
  params: {
    fromScreen: "Home",
  },
});

    setShowSearch(false);
    setInputText("");
  };

  const handleBlur = () => {
    setInputText("");
    setShowSuggestions(false);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={[
          styles.input,
          {
            borderBottomLeftRadius: showSuggestions ? 10 : 10,
            borderBottomRightRadius: showSuggestions ? 10 : 10,
            borderBottomWidth: showSuggestions ? 1 : 1,
          },
        ]}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Search any product..."
        placeholderTextColor="black" 
      />
      {inputText ? (
        <FontAwesome5
          style={styles.crossIcon}
          name="times-circle"
          size={20}
          color="#838280"
          onPress={handleBlur}
        />
      ) : null}
      {showSuggestions && inputText.length >=1 && (
        <View style={styles.suggestionContainer}>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.productISIN}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItemContainer}
                onPress={() => handleSuggestionSelect(item)}
              >
                <Image
                  style={styles.fundImage}
                  source={{
                    uri: `https://sipfund.sfo2.digitaloceanspaces.com/product-AMC-images/${item.productAMCImage}`,
                  }}
                />
                <Text style={styles.suggestionItem} numberOfLines={1}>
                  {item.productDisplayName}
                </Text>
              </TouchableOpacity>
            )}
            style={styles.flatList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "grey",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 15,
    color:"black"
  },
  crossIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  suggestionContainer: {
    position: "absolute",
    borderWidth: 0.5,
    maxHeight: 200,
    width: "100%",
    top: 50,
    backgroundColor: "#ffffff",
    zIndex: 100,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop:5,
    marginLeft:2
  },
  flatList: {
    maxHeight: 200,
  },
  fundImage: {
    width: 40,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  suggestionItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: "gray",
    color: "black",
    width: "80%",
    zIndex: 100,
  },
});

export default SuggestionInput;
