# Script to remove any invalid, non 5 letter words from the dictionary file.

BEGINNING_TEXT = "const Dictionary =`"
END_TEXT = '`\n\nexport default Dictionary;'

def Main():
    with open('./src/Dictionary.js', 'r') as f:
        words = f.read().strip(BEGINNING_TEXT).strip(END_TEXT).split('\n')

    words = [word for word in words if len(word) == 5 and word.isalpha()]

    with open('./src/Dictionary.js', 'w') as f:
        f.write(BEGINNING_TEXT)
        f.write('\n'.join(words))
        f.write(END_TEXT)

if __name__ == "__main__":
    Main()