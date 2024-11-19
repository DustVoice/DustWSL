# Register

The final thing to do now, is to register the smart card and the key to `gpg`.

The easiest way for me, since I have set the _URL of public key_ attribute on my YubiKey, is to
- `edit` the card
    ```bash,nolang,icon=.fa.fa-terminal
    gpg --card-edit
    ```
- `fetch` the public key from the URL
    ```,lang=gpg/card>
    fetch
    ```
- `quit` the `card-edit`
- `edit` the key
    ```bash,nolang,icon=.fa.fa-terminal
    gpg --edit-key info@dustvoice.de
    ```
- `trust` it ultimately (option `5`), as it's my own key, and confirming it with `y`
    ```,lang=gpg>
    trust
    5
    y
    ```
- `save` the changes and quit the prompt.
